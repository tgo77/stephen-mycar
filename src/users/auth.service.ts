import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
    console.log('====================================');
    console.log(this.usersService);
    console.log('====================================');
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

    

  };

  signin = (email: string, password: string) => {};
}
