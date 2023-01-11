import { CreateDateColumn, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('cars_image')
export class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;
}
