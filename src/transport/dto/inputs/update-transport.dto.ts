import { PartialType } from '@nestjs/mapped-types';
import { FinishTriptDto } from './finish-trip.dto';

export class UpdateTransportDto extends PartialType(FinishTriptDto) {}
