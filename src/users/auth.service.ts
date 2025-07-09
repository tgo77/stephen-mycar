import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { AuthPayloadDto } from './dtos/auth-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private _config: ConfigService,
    private _jwtService: JwtService,
  ) {
    // console.log('====================================');
    // // console.log(this.usersService);
    // console.log(`AuthService()`);
    // console.log(this._config);
    // console.log(this._jwtService);
    // console.log('====================================');
  }

  /**
   *
   * @param payloadDto
   * @returns
   */
  validateUser = async (payloadDto: AuthPayloadDto) => {
    const { username, password } = payloadDto;
    const [user] = await this.usersService.find(username);
    if (!user) {
      throw new NotFoundException(`validateUser(${username})`);
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException(`AuthService::validateUser()`);
    }
    console.log('====================================');
    console.log(`validateUser()`, user);
    console.log('====================================');
    return this._jwtService.sign({
      id: user.id,
      email: user.email,
      admin: user.admin,
    });
  };

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
