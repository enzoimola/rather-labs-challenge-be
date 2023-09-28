import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMedia {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => Boolean, { nullable: true })
  markAsFav: boolean;
}
