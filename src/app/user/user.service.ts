import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './user.repository';
import { ICreateUserResponse } from '../../models/interfaces/user/create-user-response.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(input: CreateUserInput): Promise<ICreateUserResponse> {
    const createdUser = await this.userRepository.create(input);
    return createdUser;
  }

  async getUser(email: string): Promise<any> {
    return await this.userRepository.getUser(email);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
