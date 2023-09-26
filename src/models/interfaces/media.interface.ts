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
  poster_path: string;
  @Field(() => String, { nullable: true })
  release_date: string;
  @Field(() => Number, { nullable: true })
  vote_average: number;
  @Field(() => Boolean, { nullable: true })
  isMovie: boolean;
}
