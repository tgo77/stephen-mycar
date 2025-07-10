import { Injectable } from '@nestjs/common';
import { UserAuthorityRepository } from './repositories/user-authority.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthority } from './entities/user-authority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthorityService {
  constructor(
    @InjectRepository(UserAuthority) private repo: Repository<UserAuthority>,
    // private repo: UserAuthorityRepository,
  ) {
    // console.log('====================================');
    // console.log(this.repo);
    // console.log('====================================');
  }
}
