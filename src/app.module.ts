import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { HallsModule } from './halls/halls.module';
import { ScreeningsModule } from './screenings/screenings.module';
import { BookingsModule } from './bookings/bookings.module';


@Module({
  imports: [FilmsModule, HallsModule, ScreeningsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
