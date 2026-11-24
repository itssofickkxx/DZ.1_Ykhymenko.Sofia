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
import { CreateScreeningDto } from './dto/create-screening.dto';
import { UpdateScreeningDto } from './dto/update-screening.dto';
import { ScreeningsService } from './screenings.service';

@ApiTags('Screenings')
@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити сеанс' })
  @ApiResponse({ status: 201, description: 'Сеанс створено' })
  create(@Body() dto: CreateScreeningDto) {
    return this.screeningsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх сеансів' })
  @ApiResponse({ status: 200, description: 'Список сеансів' })
  findAll() {
    return this.screeningsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати сеанс за ID' })
  @ApiResponse({ status: 200, description: 'Сеанс знайдено' })
  @ApiResponse({ status: 404, description: 'Сеанс не знайдено' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.screeningsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити сеанс за ID' })
  @ApiResponse({ status: 200, description: 'Сеанс оновлено' })
  @ApiResponse({ status: 404, description: 'Сеанс не знайдено' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateScreeningDto,
  ) {
    return this.screeningsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Видалити сеанс за ID' })
  @ApiResponse({ status: 204, description: 'Сеанс видалено' })
  @ApiResponse({ status: 404, description: 'Сеанс не знайдено' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.screeningsService.remove(id);
  }
}