import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Flag } from './flags.entity';

@Entity('flag_history')
export class FlagHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flag, { onDelete: 'CASCADE' })
  flag: Flag;

  @Column()
  fieldName: string;

  @Column({ type: 'jsonb' })
  oldValue: Record<string, any>;

  @Column({ type: 'jsonb' })
  newValue: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
