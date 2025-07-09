import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * 시크릿키값을 환경변수에서 어떻게 가져올것인지?
 *
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `RANDOMSTRING`,
    });
  }

  validate = async (payload: any) => {
    console.log('====================================');
    console.log(`JwtStrategy:validate()`, payload);
    console.log('====================================');

    return payload;
  };
}
