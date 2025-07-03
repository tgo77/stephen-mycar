import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
//import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  //@Exclude()
  password: string;

  @AfterInsert()
  logInsert = () => {
    console.log('Inserted User with id ', this.id, this.email);
  };

  @AfterUpdate()
  logUpdate = () => {
    console.log('Updated User with id ', this.id, this.email);
  };
  @AfterRemove()
  logRemove = () => {
    console.log('Removed User with id ', this.id, this.email);
  };
}
