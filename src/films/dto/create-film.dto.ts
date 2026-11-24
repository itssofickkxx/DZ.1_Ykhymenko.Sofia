import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty({ example: 'Інтерстеллар' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 169, minimum: 1 })
  @IsInt()
  @Min(1)
  durationMinutes: number;

  @ApiProperty({ example: 2014, minimum: 1888 })
  @IsInt()
  @Min(1888)
  releaseYear: number;
}