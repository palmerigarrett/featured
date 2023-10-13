import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { EnvironmentDto } from './dto/environment.dto';

@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Post()
  create(@Body() createEnvironmentDto: EnvironmentDto) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Get()
  findAll() {
    return this.environmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnvironmentDto: EnvironmentDto,
  ) {
    return this.environmentsService.update(+id, updateEnvironmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentsService.remove(+id);
  }
}
