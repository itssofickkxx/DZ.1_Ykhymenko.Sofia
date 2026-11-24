import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { HallsService } from '../halls/halls.service';
import { ScreeningsService } from '../screenings/screenings.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  private readonly bookings: Booking[] = [];

  constructor(
    private readonly screeningsService: ScreeningsService,
    private readonly hallsService: HallsService,
  ) {}

  private validateSeatAvailability(
    screeningId: string,
    row: number,
    seat: number,
    ignoreBookingId?: string,
  ): void {
    const screening = this.screeningsService.findOne(screeningId);
    const hall = this.hallsService.findOne(screening.hallId);

    if (row > hall.rowsCount || seat > hall.seatsPerRow) {
      throw new BadRequestException(
        `Місце (ряд ${row}, місце ${seat}) виходить за межі залу (${hall.rowsCount} рядів по ${hall.seatsPerRow} місць)`,
      );
    }

    const isTaken = this.bookings.some(
      (item) =>
        item.id !== ignoreBookingId &&
        item.screeningId === screeningId &&
        item.row === row &&
        item.seat === seat,
    );

    if (isTaken) {
      throw new ConflictException(
        `Місце (ряд ${row}, місце ${seat}) на цей сеанс уже заброньоване`,
      );
    }
  }

  create(dto: CreateBookingDto): Booking {
    this.validateSeatAvailability(dto.screeningId, dto.row, dto.seat);

    const booking: Booking = {
      id: randomUUID(),
      screeningId: dto.screeningId,
      row: dto.row,
      seat: dto.seat,
      customerName: dto.customerName,
    };
    this.bookings.push(booking);
    return booking;
  }
  findAll(): Booking[] {
    return this.bookings;
  }

  findOne(id: string): Booking {
    const booking = this.bookings.find((item) => item.id === id);
    if (!booking) {
      throw new NotFoundException(`Бронювання з id "${id}" не знайдено`);
    }
    return booking;
  }

  update(id: string, dto: UpdateBookingDto): Booking {
    const booking = this.findOne(id);
    const nextScreeningId = dto.screeningId ?? booking.screeningId;
    const nextRow = dto.row ?? booking.row;
    const nextSeat = dto.seat ?? booking.seat;

    if (
      dto.screeningId !== undefined ||
      dto.row !== undefined ||
      dto.seat !== undefined
    ) {
      this.validateSeatAvailability(nextScreeningId, nextRow, nextSeat, id);
    }

    booking.screeningId = nextScreeningId;
    booking.row = nextRow;
    booking.seat = nextSeat;
    if (dto.customerName !== undefined) {
      booking.customerName = dto.customerName;
    }
    return booking;
  }

  remove(id: string): void {
    const index = this.bookings.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Бронювання з id "${id}" не знайдено`);
    }
    this.bookings.splice(index, 1);
  }
}