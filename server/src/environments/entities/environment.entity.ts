import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Environment')
export class Environment {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string;

  @ManyToOne(() => Project, (project) => project.environments)
  @JoinColumn({ name: 'projectId' }) // This line is added to explicitly create the FK column
  projectId: number;
}
