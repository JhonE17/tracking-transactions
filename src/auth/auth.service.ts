import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 11),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
        }),
      };
    } catch (error) {
      this.handleDBErrros(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, roles: true, name: true, lastName: true },
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid (email)');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

    return {
      email: user.email,
      name: user.name,
      token: this.getJwtToken({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      }),
    };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findRandomDriverUser(){
    const user = await this.userRepository.createQueryBuilder()
    .where("roles = :roles", { roles: 'driver'})
    .orderBy("RANDOM()")
    .getOne();
    return user
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrros(errors: any): never {
    if (errors.code === '23505') {
      throw new BadRequestException(errors.detail);
    }
    console.log(errors);
    throw new InternalServerErrorException('Please check server logs');
  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('users');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBErrros(error);
    }
  }
}
