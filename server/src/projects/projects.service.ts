/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ProjectDto } from './dto/project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectHistory } from './entities/project-history.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(ProjectHistory)
    private projectsHistoryRepository: Repository<ProjectHistory>,
  ) {}
  async create(createProjectDto: ProjectDto) {
    const project = new Project();
    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    project.createdAt = new Date();
    return await this.projectsRepository.save(project);
  }

  async findAll() {
    return await this.projectsRepository.find();
  }

  async findOne(id: number) {
    return await this.projectsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: ProjectDto) {
    // Would like to set up a history change table
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      // Handle the case where the project with the given ID does not exist
      throw new Error(`Project with ID ${id} not found`);
    }

    const oldProjectData = { ...project };

    // Update project properties with values from updateProjectDto
    project.name = updateProjectDto.name;
    project.description = updateProjectDto.description;

    // Save the updated project
    await this.projectsRepository.save(project);

    const historyEntry = new ProjectHistory();
    historyEntry.project = project;
    historyEntry.fieldName = 'description'; // You can specify the field name that was updated
    historyEntry.oldValue = oldProjectData;
    historyEntry.newValue = project;

    // Save the history entry
    await this.projectsHistoryRepository.save(historyEntry);

    return project;
  }

  async remove(id: number) {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      // Handle the case where the project with the given ID does not exist
      throw new Error(`Project with ID ${id} not found`);
    }

    // Delete the project from the database
    await this.projectsRepository.remove(project);

    return `Project with ID ${id} has been removed`;
  }
}
