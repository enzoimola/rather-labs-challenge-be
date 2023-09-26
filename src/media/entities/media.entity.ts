import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  poster_path: string;
  @Field(() => String, { nullable: true })
  release_date: string;
  @Field(() => Number, { nullable: true })
  vote_average: number;
  @Field(() => Boolean, { nullable: true })
  isMovie: boolean;
}
