import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { FilmsService } from '../films/films.service';
import { HallsService } from '../halls/halls.service';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { Screening } from './screening.entity';

@Injectable()
export class ScreeningsService {
  private readonly screenings: Screening[] = [];

  constructor(
    private readonly filmsService: FilmsService,
    private readonly hallsService: HallsService,
  ) {}

  create(dto: CreateScreeningDto): Screening {
    this.filmsService.findOne(dto.filmId);
    this.hallsService.findOne(dto.hallId);

    const screening: Screening = {
      id: randomUUID(),
      filmId: dto.filmId,
      hallId: dto.hallId,
      startTime: dto.startTime,
      ticketPrice: dto.ticketPrice,
    };
    this.screenings.push(screening);
    return screening;
  }

  findAll(): Screening[] {
    return this.screenings;
  }
  findOne(id: string): Screening {
    const screening = this.screenings.find((item) => item.id === id);
    if (!screening) {
      throw new NotFoundException(`Сеанс з id "${id}" не знайдено`);
    }
    return screening;
  }

  update(id: string, dto: UpdateScreeningDto): Screening {
    const screening = this.findOne(id);
    if (dto.filmId !== undefined) {
      this.filmsService.findOne(dto.filmId);
      screening.filmId = dto.filmId;
    }
    if (dto.hallId !== undefined) {
      this.hallsService.findOne(dto.hallId);
      screening.hallId = dto.hallId;
    }
    if (dto.startTime !== undefined) {
      screening.startTime = dto.startTime;
    }
    if (dto.ticketPrice !== undefined) {
      screening.ticketPrice = dto.ticketPrice;
    }
    return screening;
  }

  remove(id: string): void {
    const index = this.screenings.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Сеанс з id "${id}" не знайдено`);
    }
    this.screenings.splice(index, 1);
  }
}