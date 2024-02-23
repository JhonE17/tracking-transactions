import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FinishTriptDto } from './dto/inputs/finish-trip.dto';
import { UpdateTransportDto } from './dto/inputs/update-transport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transport } from './entities/transport.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { calculateTime, calculateTotalAmount, distanceCalculation } from 'src/common';

@Injectable()
export class TransportService {
  private readonly logger = new Logger('TransportService');
  constructor(
    @InjectRepository(Transport)
    private readonly transporRepository: Repository<Transport>,
    private readonly authService: AuthService
  ) {}
  async requestTrip({ lat, lng, id }: User) {
    try {
      const driver = await this.authService.findRandomDriverUser();
      const newTrip = {
        initial_coordinates: [lat, lng],
        rider_id: { id },
        driver_id: { id: driver.id },
        status: 'Process'
      };
      const trip = this.transporRepository.create(newTrip);
      return await this.transporRepository.save(trip);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async finishTrip(finishTripDto: FinishTriptDto, id: string) {
    try {
      const { type_method = 'CARD', lat, lng } = finishTripDto;
      const trasnport = await this.findOne(id);
      const rider_coordinates = trasnport.initial_coordinates;
      const distance = distanceCalculation(rider_coordinates[0], rider_coordinates[1], lat, lng);
      const timeInMinute = calculateTime(distance);
      const totalAmount = calculateTotalAmount(distance, timeInMinute);
      const updateField = {
        type_method,
        amount: totalAmount,
        final_coordinates: [lat, lng],
        status: 'Complete'
      };
      const updateTransport = await this.update(id, {...updateField});
      return updateTransport;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll() {
    const transports = await this.transporRepository.find();
    return transports;
  }

  async findOne(id: string) {
    return await this.transporRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateTransportDto: UpdateTransportDto) {
    try {
      const transport = await this.transporRepository.preload({
        id,
        ...updateTransportDto,
      });
      console.log(transport);
      return await this.transporRepository.save(transport);
    } catch (error) {
      this.handleDBException(error);
    }
  }


  // Manejo de excepciones
  private handleDBException(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail.replace('Key ', ''));

    if (error.code === 'error-001') throw new BadRequestException(error.detail.replace('Key ', ''));

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor'
    );
  }
}
