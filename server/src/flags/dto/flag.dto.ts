import { IsNotEmpty } from 'class-validator';

export class FlagDto {
  @IsNotEmpty()
  readonly name: string;

  readonly createdAt: Date;
  readonly description: string;
  readonly isActive: boolean;
  readonly projectId: number;
}
