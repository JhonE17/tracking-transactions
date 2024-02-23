import { IsLatLong, IsLatitude, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class FinishTriptDto {

  @IsString()
  @IsNotEmpty()
  type_method: string;

  @IsNumber()
  lng: number;

  
  @IsNumber()
  lat: number;

}
