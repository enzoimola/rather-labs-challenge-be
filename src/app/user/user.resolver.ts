import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ICreateUserResponse } from '../../models/interfaces/user/create-user-response.interface';
import { UserResponse } from './entities/user-response.entity';
import { IUserIdResponse } from '../../models/interfaces/user/user-id-response.interface';

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
  async getUser(@Args('uid') uid: string): Promise<IUserIdResponse> {
    return await this.userService.getUser(uid);
  }
}
