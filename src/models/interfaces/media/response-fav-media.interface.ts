// export interface IMedia {
//   id: number;
//   name: string;
// }

import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class IResponseFavMedia {
  @Field(() => Boolean)
  success: boolean;
}
