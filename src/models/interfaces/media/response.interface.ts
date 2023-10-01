import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IResponse {
  @Field(() => Int)
  code: number;
  @Field(() => Boolean)
  success: boolean;
}
