import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flag } from './flags/entities/flags.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';
import { FlagsModule } from './flags/flags.module';
import { FlagHistory } from './flags/entities/flag-history.entity';
import { ProjectHistory } from './projects/entities/project-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'featured',
      entities: [Flag, FlagHistory, Project, ProjectHistory],
      synchronize: true,
    }),
    ProjectsModule,
    FlagsModule,
  ],
})
export class AppModule {}
