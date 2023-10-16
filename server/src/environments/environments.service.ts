import { Injectable } from '@nestjs/common';
import { EnvironmentDto } from './dto/environment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Environment } from './entities/environment.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectRepository(Environment)
    private environmentsRepository: Repository<Environment>,
  ) {}

  async create(createEnvironmentDto: EnvironmentDto) {
    const environment = new Environment();
    const uuid = uuidv4();
    try {
      environment.name = createEnvironmentDto.name;
      environment.description = createEnvironmentDto.description;
      environment.createdAt = new Date();
      environment.projectId = createEnvironmentDto.projectId;
      environment.id = uuid;
      await this.environmentsRepository.save(environment);
    } catch {
      throw new Error(
        `Environment with name ${createEnvironmentDto.name} already exists`,
      );
    }
    return environment;
  }

  async findAll(projectId: number) {
    return await this.environmentsRepository.find({ where: { projectId } });
  }

  async findOne(id: string) {
    return await this.environmentsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEnvironmentDto: EnvironmentDto) {
    const environment = await this.environmentsRepository.findOne({
      where: { id },
    });
    if (!environment) {
      throw new Error(`Environment with ID ${id} not found`);
    }

    environment.name = updateEnvironmentDto.name;
    environment.description = updateEnvironmentDto.description;

    await this.environmentsRepository.save(environment);
    return environment;
  }

  async remove(id: string) {
    const environment = await this.environmentsRepository.findOne({
      where: { id },
    });
    const name = environment.name;
    if (!environment) {
      throw new Error(`Environment with ID ${id} not found`);
    }
    await this.environmentsRepository.delete({ id });
    return `Environment ${name} deleted`;
  }
}
