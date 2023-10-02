import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Media } from './entities/media.entity';
import { IAddFavMediaResponse } from '../../models/interfaces/media/add-fav-media-response.interface';
import { FavMedia } from './dto/create-media.input';
import * as process from 'process';

@Injectable()
export class MediaRepository {
  async addFavMedia(media: FavMedia): Promise<IAddFavMediaResponse> {
    const database = admin.database();
    const { uid, id } = media;
    const responseFM: IAddFavMediaResponse = { success: true };

    const dbFavRef = database.ref(`favorites/${uid}`);
    try {
      if (!media.isFav) {
        await dbFavRef.child(String(id)).set(true);
      } else {
        await dbFavRef.child(String(id)).remove();
      }
    } catch (error) {
      throw Error(error);
      return { success: false };
    }
    return responseFM;
  }

  async getFavorites(uid: string): Promise<Array<Partial<Media>>> {
    const database = admin.database();
    const favoritesRef = database.refFromURL(
      `${process.env.FIREBASE_DATABASE_URL}favorites/${uid}`,
    );

    try {
      const snapshot = await favoritesRef.once('value');
      if (snapshot.val()) {
        const favoritesData: Array<Partial<Media>> = Object.keys(
          snapshot.val(),
        ).map((id) => ({
          id: parseInt(id, 10),
        }));
        return favoritesData;
      }
      return [];
    } catch (error) {
      throw Error(error);
      return [];
    }
  }
}
