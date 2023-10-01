import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ICreateUserResponse } from '../../models/interfaces/user/create-user-response.interface';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserRepository {
  async create(input: CreateUserInput): Promise<ICreateUserResponse> {
    const { uid, email, password } = input;
    const database = admin.database();
    const dbUserRef = database.ref(`users/${uid}`);

    const user = { email, password };
    let response: ICreateUserResponse = { email: email };

    try {
      await dbUserRef.set(user);
    } catch (e) {
      response = { email };
    }
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
