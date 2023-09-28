import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetUrlMedia {
  @Field(() => Number, { nullable: true })
  id: number;
  @Field(() => String, { nullable: true })
  homepage: unknown;
}
