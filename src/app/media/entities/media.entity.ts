import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  posterPath: string;
  @Field(() => String, { nullable: true })
  releaseDate: string;
  @Field(() => Number, { nullable: true })
  voteAverage: number;
  @Field(() => Boolean, { nullable: true })
  isMovie: boolean;
}
