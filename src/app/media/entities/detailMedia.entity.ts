import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DetailMedia {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  posterPath: string;
  @Field(() => String, { nullable: true })
  releaseDate: string;
  @Field(() => Number, { nullable: true })
  voteAverage: number;
  @Field(() => String, { nullable: true })
  overview: string;
  @Field(() => String, { nullable: true })
  tagline: string;
  @Field(() => String, { nullable: true })
  homepage: string;
}
