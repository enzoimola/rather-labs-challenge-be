import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  email: string;
  @Field(() => String, { nullable: true })
  password: string;
}
