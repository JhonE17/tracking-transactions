import { Transport } from 'src/transport/entities/transport.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({ type: 'text' })
  roles: string;

  @Column({ type: 'float8', nullable: true })
  lng: number;
  
  @Column({ type: 'float8', nullable: true })
  lat: number;

  @Column({ type: 'text', nullable: true })
  id_token_card: string;

  @BeforeInsert()
  checkFileBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFileBeforeUpdate() {
    this.checkFileBeforeInsert();
  }
}
