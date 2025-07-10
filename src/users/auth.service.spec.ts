import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { emit } from 'process';

describe(`AuthService`, () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((u) => u.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it(`can create an instance of auth service `, async () => {
    expect(service).toBeDefined();
  });

  it(`create a new user with a salted and hashed password`, async () => {
    const user = await service.signup('tgo77@inco.kr', '1230');
    expect(user.password).not.toEqual('1230');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it(`throws an error if user signs up with email that is in use`, async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a', password: 'b' } as User]);

    await service.signup('tgo77@incon.kr', '1230');

    await expect(service.signup('tgo77@incon.kr', '1230')).rejects.toThrow(
      BadRequestException,
    );
  });

  it(`throws if signin is called with an unused email`, async () => {
    await expect(service.signin(`tgo77@incon.kr`, '1230')).rejects.toThrow(
      NotFoundException,
    );
  });

  it(`throws if an invalid password is provided`, async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ email: 'tgo77@incon.kr', password: '1230' } as User]);
    await service.signup('tgo77@incon.kr', '1230');

    await expect(service.signin('tgo77@incon.kr', '1234')).rejects.toThrow(
      BadRequestException,
    );
  });

  it(`returns a user if correct password is provided`, async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     {
    //       email: 'tgo77@incon.kr',
    //       password:
    //         '3fd84c37999e8760.23a66fb06a0e6ad951148cd829aada06680009ade7dad0e88050b2c77fb29339',
    //     } as User,
    //   ]);

    await service.signup('tgo77@incon.kr', '1230');

    const user = await service.signin('tgo77@incon.kr', '1230');
    expect(user).toBeDefined();
    // const user = await service.signup('tgo77@incon.kr', '1230');
    // console.log('====================================');
    // console.log(user);
    // console.log('====================================');
  });
});
