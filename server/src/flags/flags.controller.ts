import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FlagsService } from './flags.service';
import { FlagDto } from './dto/flag.dto';

@Controller('flags')
export class FlagsController {
  constructor(private readonly flagsService: FlagsService) {}

  @Post()
  create(@Body() createFlagDto: FlagDto) {
    return this.flagsService.create(createFlagDto);
  }

  @Get()
  findAll() {
    return this.flagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlagDto: FlagDto) {
    return this.flagsService.update(+id, updateFlagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flagsService.remove(+id);
  }
}
