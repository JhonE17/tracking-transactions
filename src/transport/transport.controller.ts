import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportService } from './transport.service';
import { FinishTriptDto } from './dto/inputs/finish-trip.dto';
import { UpdateTransportDto } from './dto/inputs/update-transport.dto';
import { Auth, GetUser, RoleProtected } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post()
  @RoleProtected(ValidRoles.rider)
  @Auth()
  requestTrip( @GetUser() user:User) {
    return this.transportService.requestTrip(user);
  }
  
  @Post(':id')
  @RoleProtected(ValidRoles.driver)
  @Auth()
  finishTrip(@Param('id') id:string, @Body() finishTripDto: FinishTriptDto) {
    return this.transportService.finishTrip(finishTripDto,id);
  }

  @Get()
  @Auth()
  findAll() {
    return this.transportService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.transportService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateTransportDto: UpdateTransportDto) {
    return this.transportService.update(id, updateTransportDto);
  }
}
