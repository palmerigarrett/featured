import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('project_history')
export class ProjectHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  project: Project;

  @Column()
  fieldName: string;

  @Column({ type: 'jsonb' })
  oldValue: Record<string, any>;

  @Column({ type: 'jsonb' })
  newValue: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
