import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('EnvironmentFlag')
export class EnvironmentFlag {
  @PrimaryColumn({ type: 'uuid', length: 36 })
  id: string;

  @Column()
  environmentId: string;

  @Column()
  flagId: number;
}
