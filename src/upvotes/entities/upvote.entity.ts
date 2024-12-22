import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VoteState {
  UP = 'UP',
  DOWN = 'DOWN',
  NONE = 'NONE',
}

@Entity('upvotes')
export class Upvote {
  @PrimaryColumn({ name: 'user_id', type: 'varchar' })
  userId: string;

  @PrimaryColumn({ name: 'post_id', type: 'varchar' })
  postId: string;

  @Column({ type: 'enum', enum: VoteState })
  state: VoteState;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
  })
  post: Post;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
