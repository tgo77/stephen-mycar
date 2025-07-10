import {  Repository } from 'typeorm';
import { UserAuthority } from '../entities/user-authority.entity';
import { CustomRepository } from 'src/decorators/typeorm-ex.decorator';

@CustomRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
