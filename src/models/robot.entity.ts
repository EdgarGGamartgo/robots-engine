import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Robot {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  name: string;

  @Column()
  orientation: string;

  @Column()
  speed: number;

  @Column()
  dest_x: number;

  @Column()
  dest_y: number;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updtedAt?: string;
}
