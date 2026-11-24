import { Module } from '@nestjs/common';
import { FilmsModule } from '../films/films.module';
import { HallsModule } from '../halls/halls.module';
import { ScreeningsController } from './screenings.controller';
import { ScreeningsService } from './screenings.service';

@Module({
  imports: [FilmsModule, HallsModule],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  exports: [ScreeningsService],
})
export class ScreeningsModule {}