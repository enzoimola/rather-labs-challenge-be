import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMedia {
  @Field(() => Boolean)
  id: boolean;
  @Field(() => Boolean)
  markAsFav: boolean;
}
