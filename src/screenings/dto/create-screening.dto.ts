import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateScreeningDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  filmId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsUUID()
  hallId: string;

  @ApiProperty({ example: '2026-11-24T18:30:00.000Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: 180, minimum: 0 })
  @IsNumber()
  @Min(0)
  ticketPrice: number;
}