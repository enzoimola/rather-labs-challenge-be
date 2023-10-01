import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ISaveMedia } from '../../models/interfaces/save-media.interface';
import { Media } from './entities/media.entity';
import { IResponseFavMedia } from '../../models/interfaces/media/response-fav-media.interface';
import { FavMedia } from './dto/create-media.input';

@Injectable()
export class MediaRepository {
  async findSearch(search: string) {
    const searchURL = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTYwMzZlNTAxMjQxMzdiOWMzNjYyZjM0MTViMTFkZSIsInN1YiI6IjY1MGQ4MDFlOTNkYjkyMDEzOGU1MzhkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.keetD6EUEkRf5FK-JbfJIyF-C4-VwyieHnNk__jPZn8',
      },
    };

    const response = await fetch(searchURL, options);
    const json = await response.json();
    return json.results;
  }

  async saveFavMedia(media: FavMedia): Promise<IResponseFavMedia> {
    const database = admin.database();
    const { uid, id } = media;
    const responseFM: IResponseFavMedia = { success: true };

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

  async saveMedia(media: ISaveMedia): Promise<any> {
    const database = admin.database();
    const dbMediaRef = database.ref('media');

    const resp = await dbMediaRef.child(String(media.id)).set(media.homepage);
    return resp;
  }

  async getFavorites(uid: string): Promise<any> {
    const database = admin.database();
    const favoritesRef = database.ref(`favorites/${uid}`);

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

  async getURLMedia(): Promise<{ id: string; homepage: unknown }[]> {
    const database = admin.database();
    const mediaRef = database.ref('media');

    const snapshot = await mediaRef.once('value');
    const mediaData = snapshot.val() || {};

    // Convert the data to an array of objects
    return Object.entries(mediaData).map(([id, homepage]) => ({
      id,
      homepage,
    }));
  }
}
