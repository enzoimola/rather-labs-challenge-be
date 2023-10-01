import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IAddFavMediaResponse {
  @Field(() => Boolean)
  success: boolean;
}
