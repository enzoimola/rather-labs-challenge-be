import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IUserIdResponse {
  @Field(() => String, { nullable: true })
  email: string;
  @Field(() => String, { nullable: true })
  uid: string;
}
