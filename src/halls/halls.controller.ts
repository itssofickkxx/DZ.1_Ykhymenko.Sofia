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
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { HallsService } from './halls.service';

@ApiTags('Halls')
@Controller('halls')
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити зал' })
  @ApiResponse({ status: 201, description: 'Зал створено' })
  create(@Body() dto: CreateHallDto) {
    return this.hallsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список усіх залів' })
  @ApiResponse({ status: 200, description: 'Список залів' })
  findAll() {
    return this.hallsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати зал за ID' })
  @ApiResponse({ status: 200, description: 'Зал знайдено' })
  @ApiResponse({ status: 404, description: 'Зал не знайдено' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hallsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Оновити зал за ID' })
  @ApiResponse({ status: 200, description: 'Зал оновлено' })
  @ApiResponse({ status: 404, description: 'Зал не знайдено' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateHallDto) {
    return this.hallsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Видалити зал за ID' })
  @ApiResponse({ status: 204, description: 'Зал видалено' })
  @ApiResponse({ status: 404, description: 'Зал не знайдено' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.hallsService.remove(id);
  }
}