import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'text', select:false })
  password: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @Column({ type: 'text', array: true, default: ['rider'] })
  roles: string[];


  @BeforeInsert()
  checkFileBeforeInsert(){
    this.email = this.email.toLowerCase().trim()
  }

  @BeforeUpdate()
  checkFileBeforeUpdate(){
    this.checkFileBeforeInsert()
  }
}
