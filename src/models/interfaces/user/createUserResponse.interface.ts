import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ICreateUserResponse {
  @Field(() => String, { nullable: true })
  email: string;
}
