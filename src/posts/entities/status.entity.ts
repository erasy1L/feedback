import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('status')
export class Status {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar')
  value: string;
}

export enum StatusEnum {
  NOTED = 'noted',
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
