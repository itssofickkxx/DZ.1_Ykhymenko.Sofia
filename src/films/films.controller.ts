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
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmsService } from './films.service';

@ApiTags('Films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити фільм' })
  @ApiResponse({ status: 201, description: 'Фільм створено' })
  create(@Body() dto: CreateFilmDto) {
    return this.filmsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх фільмів' })
  @ApiResponse({ status: 200, description: 'Список фільмів' })
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати фільм за ID' })
  @ApiResponse({ status: 200, description: 'Фільм знайдено' })
  @ApiResponse({ status: 404, description: 'Фільм не знайдено' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.filmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити фільм за ID' })
  @ApiResponse({ status: 200, description: 'Фільм оновлено' })
  @ApiResponse({ status: 404, description: 'Фільм не знайдено' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateFilmDto) {
    return this.filmsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Видалити фільм за ID' })
  @ApiResponse({ status: 204, description: 'Фільм видалено' })
  @ApiResponse({ status: 404, description: 'Фільм не знайдено' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.filmsService.remove(id);
  }
}