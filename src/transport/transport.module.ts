import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from './entities/transport.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [TransportController],
  providers: [TransportService, AuthService],
  imports: [TypeOrmModule.forFeature([Transport, User]), AuthModule],
  exports:[TransportService, TypeOrmModule]
})
export class TransportModule {}
