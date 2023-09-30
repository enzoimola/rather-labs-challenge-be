import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ICreateUserResponse } from '../../models/interfaces/user/createUserResponse.interface';
import { CreateUserInput } from './dto/create-user.input';
import { IResponse } from '../../models/interfaces/IResponse.interface';

@Injectable()
export class UserRepository {
  async create(input: CreateUserInput): Promise<IResponse> {
    const { uid, email, password } = input;
    const database = admin.database();
    const dbUserRef = database.ref(`users/${uid}`);

    let response: IResponse = { code: null, success: null };
    const user = { email, password };

    dbUserRef
      .set(user)
      .then(() => {
        response = { code: 200, success: true };
      })
      .catch((error) => {
        response = { code: error.code, success: false };
      });
    return response;
  }

  async getUser(uid: string): Promise<any> {
    const dbUserRef = admin.database().ref(`users`);

    try {
      const snapshot = await dbUserRef.child(uid).get();

      if (snapshot.exists()) {
        const { email } = snapshot.val();
        return { email, uid };
      }
    } catch (error) {
      throw new Error(
        'Error checking user existence in Firebase: ' + error.message,
      );
    }
  }
}
