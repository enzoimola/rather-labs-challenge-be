import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FavMedia {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String)
  uid: string;
  @Field(() => Boolean)
  isFav: boolean;
}
