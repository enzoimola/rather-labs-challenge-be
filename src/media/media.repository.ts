import { Injectable } from '@nestjs/common';
import { FavMedia } from './entities/fav-media.entity';
import * as admin from 'firebase-admin';
import { ISaveMedia } from '../models/interfaces/save-media.interface';
import { IMediaGetResponse } from '../models/interfaces/mediaGetResponse.interface';
import { GetUrlMedia } from './entities/getUrlMedia.entity';

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

  async saveFavMedia(media: FavMedia): Promise<any> {
    const id = Object.keys(media)[0];
    const fav = media[id];

    const database = admin.database();
    const dbFavRef = database.ref('favorites');

    const snapshot = await dbFavRef.child(id).once('value');

    const itemExistsInFavorites = snapshot.exists();
    debugger;

    if (fav) {
      // If the item is marked as a favorite, add it to the favorites collection
      if (!itemExistsInFavorites) {
        return await dbFavRef.child(id).set(true);
      }
    } else {
      // If the item is not a favorite, remove it from the favorites collection
      if (itemExistsInFavorites) {
        return await dbFavRef.child(id).remove();
      }
    }
  }

  async saveMedia(media: ISaveMedia): Promise<any> {
    const database = admin.database();
    const dbMediaRef = database.ref('media');

    const resp = await dbMediaRef.child(String(media.id)).set(media.homepage);
    return resp;
  }

  async getFavorites(): Promise<{ markAsFav: boolean; id: number }[]> {
    const database = admin.database();
    const favoritesRef = database.ref('favorites');

    // Retrieve the entire "favorites" collection
    const snapshot = await favoritesRef.once('value');

    if (!snapshot.val()) return [];

    // Convert the snapshot to an array of favorite items
    const favoritesData = Object.keys(snapshot.val()).map((id) => ({
      id: parseInt(id, 10),
      markAsFav: true,
    }));

    return favoritesData;
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
