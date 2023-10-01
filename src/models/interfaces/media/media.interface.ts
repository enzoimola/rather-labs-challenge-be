// export interface IMedia {
//   id: number;
//   name: string;
// }

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IMedia {
  @Field(() => Int)
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
