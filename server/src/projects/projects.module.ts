import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectHistory } from './entities/project-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectHistory])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
