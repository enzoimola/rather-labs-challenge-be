import { ObjectType, Field, ID } from '@nestjs/graphql';

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
  @Field(() => [CastMemberEntity], { nullable: true })
  actors: CastMemberEntity[];
}

@ObjectType()
export class CastMemberEntity {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  character: string;

  @Field(() => String, { nullable: true })
  knowForDepartment: string;

  @Field(() => Number, { nullable: true })
  popularity: number;
  @Field(() => String, { nullable: true })
  profilePath: string;
}
