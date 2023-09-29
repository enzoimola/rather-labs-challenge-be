import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ICreateUserResponse {
  @Field(() => Int)
  code: number;
  @Field(() => Boolean)
  success: boolean;
}
