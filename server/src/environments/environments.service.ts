import { Injectable } from '@nestjs/common';
import { EnvironmentDto } from './dto/environment.dto';

@Injectable()
export class EnvironmentsService {
  create(createEnvironmentDto: EnvironmentDto) {
    return 'This action adds a new environment';
  }

  findAll() {
    return `This action returns all environments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} environment`;
  }

  update(id: number, updateEnvironmentDto: EnvironmentDto) {
    return `This action updates a #${id} environment`;
  }

  remove(id: number) {
    return `This action removes a #${id} environment`;
  }
}
