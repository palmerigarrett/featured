import { Module } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './entities/environment.entity';
import { EnvironmentFlag } from '../flags/entities/environment-flag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Environment, EnvironmentFlag])],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
})
export class EnvironmentsModule {}
