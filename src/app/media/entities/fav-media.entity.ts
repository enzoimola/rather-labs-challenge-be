import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMedia {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String)
  uid: string;
  @Field(() => Boolean, { nullable: true })
  markAsFav: boolean;
  @Field(() => Boolean, { nullable: true })
  isMovie: boolean;
}
