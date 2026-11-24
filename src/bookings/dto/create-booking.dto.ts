import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002' })
  @IsUUID()
  screeningId: string;

  @ApiProperty({ example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  row: number;

  @ApiProperty({ example: 7, minimum: 1 })
  @IsInt()
  @Min(1)
  seat: number;

  @ApiProperty({ example: 'Софія Юхименко' })
  @IsString()
  customerName: string;
}