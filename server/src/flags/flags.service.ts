import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flag } from './entities/flags.entity';
import { FlagDto } from './dto/flag.dto';
import { FlagHistory } from './entities/flag-history.entity';

@Injectable()
export class FlagsService {
  constructor(
    @InjectRepository(Flag)
    private flagsRepository: Repository<Flag>,
    @InjectRepository(FlagHistory)
    private flagHistoryRepository: Repository<FlagHistory>,
  ) {}

  async create(flagDto: FlagDto): Promise<Flag> {
    const flag = new Flag();
    flag.name = flagDto.name;
    flag.description = flagDto.description;
    flag.createdAt = new Date();
    flag.isActive = flagDto.isActive;
    flag.projectId = flagDto.projectId;
    return this.flagsRepository.save(flag);
  }

  async findAll(): Promise<Flag[]> {
    return await this.flagsRepository.find();
  }

  async findOne(id: number): Promise<Flag | null> {
    return await this.flagsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFlagDto: FlagDto) {
    // Would like to set up a history change table
    const flag = await this.flagsRepository.findOne({ where: { id } });

    if (!flag) {
      // Handle the case where the flag with the given ID does not exist
      throw new Error(`Flag with ID ${id} not found`);
    }
    const oldFlagData = { ...flag };
    // Update flag properties with values from updateFlagDto
    flag.name = updateFlagDto.name;
    flag.description = updateFlagDto.description;
    flag.isActive = updateFlagDto.isActive;

    // Save the updated flag
    await this.flagsRepository.save(flag);
    // Create a FlagHistory record
    const historyEntry = new FlagHistory();
    historyEntry.flag = flag;
    historyEntry.fieldName = 'isActive'; // You can specify the field name that was updated
    historyEntry.oldValue = oldFlagData;
    historyEntry.newValue = flag;

    // Save the history entry
    await this.flagHistoryRepository.save(historyEntry);

    return flag;
  }

  async remove(id: number) {
    const flag = await this.flagsRepository.findOne({ where: { id } });

    if (!flag) {
      // Handle the case where the flag with the given ID does not exist
      throw new Error(`Flag with ID ${id} not found`);
    }

    // Delete the flag from the database
    await this.flagsRepository.remove(flag);

    return `Flag with ID ${id} has been removed`;
  }
}
