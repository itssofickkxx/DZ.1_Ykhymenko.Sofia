import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Забронювати квиток' })
  @ApiResponse({ status: 201, description: 'Квиток заброньовано' })
  @ApiResponse({ status: 400, description: 'Місце за межами залу або невалідні дані' })
  @ApiResponse({ status: 409, description: 'Місце вже зайняте на цей сеанс' })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх бронювань' })
  @ApiResponse({ status: 200, description: 'Список бронювань' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати бронювання за ID' })
  @ApiResponse({ status: 200, description: 'Бронювання знайдено' })
  @ApiResponse({ status: 404, description: 'Бронювання не знайдено' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити бронювання за ID' })
  @ApiResponse({ status: 200, description: 'Бронювання оновлено' })
  @ApiResponse({ status: 400, description: 'Місце за межами залу або невалідні дані' })
  @ApiResponse({ status: 404, description: 'Бронювання не знайдено' })
  @ApiResponse({ status: 409, description: 'Місце вже зайняте на цей сеанс' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Скасувати бронювання за ID' })
  @ApiResponse({ status: 204, description: 'Бронювання скасовано' })
  @ApiResponse({ status: 404, description: 'Бронювання не знайдено' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.remove(id);
  }
}