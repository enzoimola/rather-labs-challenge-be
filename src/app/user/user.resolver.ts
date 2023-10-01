import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ICreateUserResponse } from '../../models/interfaces/user/createUserResponse.interface';
import { IResponse } from '../../models/interfaces/IResponse.interface';
import { UserResponse } from './entities/userResponse.entity';
import { Body } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => ICreateUserResponse)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<ICreateUserResponse> {
    return await this.userService.create(input);
  }

  @Query(() => UserResponse)
  async getUser(@Args('uid') uid: string): Promise<IResponse> {
    return await this.userService.getUser(uid);
  }
}
