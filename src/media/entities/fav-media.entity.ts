import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMedia {
  @Field(() => Number)
  id: number;
  @Field(() => Boolean)
  markAsFav: boolean;
}
