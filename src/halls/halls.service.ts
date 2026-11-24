import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { Hall } from './hall.entity';

@Injectable()
export class HallsService {
  private readonly halls: Hall[] = [];

  create(dto: CreateHallDto): Hall {
    const hall: Hall = {
      id: randomUUID(),
      name: dto.name,
      rowsCount: dto.rowsCount,
      seatsPerRow: dto.seatsPerRow,
    };
    this.halls.push(hall);
    return hall;
  }

  findAll(): Hall[] {
    return this.halls;
  }
  findOne(id: string): Hall {
    const hall = this.halls.find((item) => item.id === id);
    if (!hall) {
      throw new NotFoundException(`Зал з id "${id}" не знайдено`);
    }
    return hall;
  }

  update(id: string, dto: UpdateHallDto): Hall {
    const hall = this.findOne(id);
    if (dto.name !== undefined) {
      hall.name = dto.name;
    }
    if (dto.rowsCount !== undefined) {
      hall.rowsCount = dto.rowsCount;
    }
    if (dto.seatsPerRow !== undefined) {
      hall.seatsPerRow = dto.seatsPerRow;
    }
    return hall;
  }

  remove(id: string): void {
    const index = this.halls.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Зал з id "${id}" не знайдено`);
    }
    this.halls.splice(index, 1);
  }
}