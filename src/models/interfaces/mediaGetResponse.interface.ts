// export interface IMedia {
//   id: number;
//   name: string;
// }

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IMediaGetResponse {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  homepage: string;
}
