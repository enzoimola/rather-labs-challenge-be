import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IFavResponse {
  @Field(() => Int)
  id: number;
  @Field(() => Boolean)
  markAsFav: boolean;
}
