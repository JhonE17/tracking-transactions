import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/data';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class SeedService {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
      ) {}

    async executeSeed() {
        await this.deleteTables();
        await this.insertUsers();
        return `Seed execute`;
      }
    
      private async deleteTables() {
        await this.authService.deleteAllUsers()
        const queryBuilder = this.userRepository.createQueryBuilder();
        await queryBuilder.delete().where({}).execute();
      }
    
      private async insertUsers() {
        const seedUser = initialData.users;
    
        const users: User[] = [];
    
        seedUser.forEach(({password,...user}) => {
          users.push(this.userRepository.create({
            ...user,
            password: bcrypt.hashSync(password, 11),
          }));
        });
    
        const dbUsers =  await this.userRepository.save(users);
    
        return dbUsers[0];
      }
}
