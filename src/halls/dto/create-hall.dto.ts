import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateHallDto {
  @ApiProperty({ example: 'Зал №1 (IMAX)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10, minimum: 1 })
  @IsInt()
  @Min(1)
  rowsCount: number;

  @ApiProperty({ example: 12, minimum: 1 })
  @IsInt()
  @Min(1)
  seatsPerRow: number;
}