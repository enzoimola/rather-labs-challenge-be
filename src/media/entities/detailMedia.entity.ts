import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DetailMedia {
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
  @Field(() => String, { nullable: true })
  overview: string;
}
