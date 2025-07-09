/**
 * LOCAL STRATEGY
 *
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super();
    // console.log('====================================');
    // console.log(`LocalStrategy()`);
    // console.log(this._authService);
    // console.log('====================================');
  }

  validate = async (username: string, password: string) => {
    console.log('====================================');
    console.log(`LocalStrategy::validate(${username})`);
    console.log('====================================');
    const user = await this._authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException(
        `LocalStrategy::validate(${username}, ${password})`,
      );
    }
    return user;
  };
}
