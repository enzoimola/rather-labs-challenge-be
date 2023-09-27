import { Injectable } from '@nestjs/common';
import { FavMedia } from './entities/fav-media.entity';
import * as admin from 'firebase-admin';

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

  async saveFavMedia(media: FavMedia) {
    // debugger;
    const database = admin.database();
    const dbRef = database.ref('favorites'); // Replace 'users' with your desired database path

    dbRef
      .push(media)
      .then(() => {
        return console.log('Data added successfully to Firebase.');
      })
      .catch((error) => {
        return console.error('Error adding data to Firebase:', error);
      });
    // const firestore = new admin.firestore.Firestore();
    // (await firestore.collection('/favorites').add(media)
  }
}
