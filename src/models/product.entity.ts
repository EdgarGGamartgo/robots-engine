import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updtedAt?: string;
}
