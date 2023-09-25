import { ObjectType, Field } from '@nestjs/graphql';
import { IMedia } from '../../models/interfaces/media.interface';

@ObjectType()
export class Media {
  @Field((type) => String)
  media: IMedia['result'];
}
