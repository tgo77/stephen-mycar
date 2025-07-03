import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
    // console.log('====================================');
    // console.log(this.usersService);
    // console.log('====================================');
  }

  /**
   *
   * @param email
   * @param password
   */
  signup = async (email: string, password: string) => {
    // 가입여부체크 (이메일)
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException(`email in use`);
    }
    
    // 해시
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    console.log('====================================');
    console.log(salt, password, hash);
    console.log('====================================');
    const result = salt + '.' + hash.toString('hex');

    // USER
    const user = this.usersService.create(email, result);

    return user;
  };

  signin = async (email: string, password: string) => {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException(``);
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException(``);
    }

    return user;
  };
}
