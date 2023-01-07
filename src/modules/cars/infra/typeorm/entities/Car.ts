import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

// @Entity('cars')
export class Car {
  // @PrimaryColumn()
  id: string;

  // @Column()
  name: string;

  // @Column()
  description: string;

  daily_rate: number;

  available: boolean;

  license_plate: string;

  fine_amount: number;

  brand: string;

  category_id: string;

  // @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
