import { Environment } from 'src/environments/entities/environment.entity';
import { Flag } from 'src/flags/entities/flags.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string;

  @Column({ type: 'uuid', length: 36 })
  projectKey: string;

  @OneToMany(() => Flag, (flag) => flag.projectId)
  flags: Flag[];

  @OneToMany(() => Environment, (environment) => environment.projectId)
  @Column()
  environments: Environment[];
}
