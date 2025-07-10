import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Report } from '../../reports/report.entity';
import { UserAuthority } from './user-authority.entity';
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

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany((type) => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities?: any[];

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
