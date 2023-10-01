import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UserRepository } from './user.repository';
import { ICreateUserResponse } from '../../models/interfaces/user/create-user-response.interface';
import { IUserIdResponse } from '../../models/interfaces/user/user-id-response.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(input: CreateUserInput): Promise<ICreateUserResponse> {
    const createdUser = await this.userRepository.create(input);
    return createdUser;
  }

  async getUser(email: string): Promise<IUserIdResponse> {
    return await this.userRepository.getUser(email);
  }
}
