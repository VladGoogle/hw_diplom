import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from "./user.entity";

const result = {
  firstName: 'Vlad',
  lastName: 'Google',
  email: 'email2@gmail.com',
  phone: 3483389398,
  type: 'admin',
};

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {

    const spy = jest.spyOn(userService, "registerUser").mockResolvedValue(result);
    expect(controller).toBeDefined();
  });
});
