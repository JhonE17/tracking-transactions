import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transport' })
export class Transport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'float8', nullable:true})
  amount?: number;

  @Column({type:'text',nullable:true})
  type_method?: string;

  @Column({ type: 'float8', array: true ,nullable:true})
  initial_coordinates: number[];

  @Column({ type: 'float8', array: true ,nullable:true })
  final_coordinates?: number[];
  
  @Column({ type: 'text', nullable: true })
  status?: string;

  // Relationship
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'rider_id' })
  rider_id: User;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver_id: User;
}
