import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar' })
  value: string;
}

export enum CategoryEnum {
  FEATURE = 'feature',
  UI = 'ui',
  BUG = 'bug',
}
