import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /**
   *
   * @param email
   * @param password
   * @returns
   */
  create = (email: string, password: string) => {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  };

  /**
   *
   * @param id
   * @returns
   */
  findOne = async (id: number) => {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  };
  /**
   *
   * @param email
   * @returns
   */
  find = async (email: string) => {
    return this.repo.find({ where: { email } });
  };

  /**
   *
   * @param id
   * @param attrs
   * @returns
   */
  update = async (id: number, attrs: Partial<User>) => {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`user not found `);
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  };

  /**
   *
   * @param id
   */
  remove = async (id: number) => {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`user not found`);
    }
    return this.repo.remove(user);
  };
}
