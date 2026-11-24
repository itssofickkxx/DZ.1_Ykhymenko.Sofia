import { Module } from '@nestjs/common';
import { HallsModule } from '../halls/halls.module';
import { ScreeningsModule } from '../screenings/screenings.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [ScreeningsModule, HallsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}