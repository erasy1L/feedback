import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category, CategoryEnum } from './category.entity';
import { Status, StatusEnum } from './status.entity';

@Entity('posts')
@Index(['status'])
@Index(['category', 'status'])
export class Post {
  @PrimaryColumn('varchar')
  id: string;

  @Index()
  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column({ name: 'category_id', type: 'integer' })
  categoryId: number;

  @Column({ name: 'status_id', type: 'integer' })
  statusId: number;

  @ManyToOne(() => Category, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => Status, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status: Status;

  @Column({ name: 'author_id', type: 'varchar' })
  authorId: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
export { CategoryEnum, StatusEnum };
