import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlagsService } from './flags.service';
import { FlagsController } from './flags.controller';
import { Flag } from './entities/flags.entity';
import { FlagHistory } from './entities/flag-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flag, FlagHistory])],
  providers: [FlagsService],
  controllers: [FlagsController],
})
export class FlagsModule {}
