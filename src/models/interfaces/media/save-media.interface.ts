// export interface IMedia {
//   id: number;
//   name: string;
// }

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ISaveMedia {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  homepage: string;
}
