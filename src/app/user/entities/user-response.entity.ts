import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => String)
  uid: string;
  @Field(() => String)
  email: string;
}
