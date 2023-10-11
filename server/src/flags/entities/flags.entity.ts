import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FlagHistory } from './flag-history.entity';

@Entity('flag')
export class Flag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => Project, (project) => project.flags)
  @JoinColumn({ name: 'projectId' }) // This line is added to explicitly create the FK column
  projectId: number;

  @OneToMany(() => FlagHistory, (history) => history.flag)
  history: FlagHistory[];
}
