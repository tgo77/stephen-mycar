import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'tgo77@incon.kr',
          password: '1230',
        } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: '1230' }] as User[]),
      // remove: (id: number) => Promise.resolve({}),
      // update: () => Promise.resolve(),
    };
    fakeAuthService = {
      // signup: (email: string, password: string) => Promise.resolve({}),
      signin: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it(`should be defined`, () => {
    expect(controller).toBeDefined();
  });

  it(`findAllUsers returns a list of users with the given email`, async () => {
    const users = await controller.findAllUsers('tgo77@incon.kr');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('tgo77@incon.kr');
  });

  it(`findUser return a single user with the given id`, async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it(`findUser throws an error if user with given id is not found`, async () => {
    fakeUsersService.findOne = () => Promise.resolve(null);
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it(`signin updates session object an returns user`, async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'tgo77@incon.kr', password: '1230' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
