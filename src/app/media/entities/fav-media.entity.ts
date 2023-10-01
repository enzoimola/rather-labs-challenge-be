import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FavMediaEntity {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String)
  uid: string;
  @Field(() => Boolean)
  isFav: boolean;
}
