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

  // need to create an projectKey column

  @OneToMany(() => Flag, (flag) => flag.projectId)
  flags: Flag[];
}
