import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ICreateUserResponse } from '../../models/interfaces/user/createUserResponse.interface';
import { CreateUserInput } from './dto/create-user.input';
import { IResponse } from '../../models/interfaces/IResponse.interface';

@Injectable()
export class UserRepository {
  async create(input: CreateUserInput): Promise<IResponse> {
    const database = admin.database();
    const dbUserRef = database.ref('users');
    let response: IResponse = { code: null, success: null };

    const user = {
      uid: input.uid,
      email: input.email,
      password: input.password,
    };

    const newUserRef = dbUserRef.push();

    newUserRef
      .set(user)
      .then(() => {
        response = { code: 200, success: true };
      })
      .catch((error) => {
        response = { code: error.code, success: false };
      });
    return response;
  }

  async userExists(email): Promise<IResponse> {
    const database = admin.database();
    const dbUserRef = database.ref(`users`);
    let response: IResponse = { code: null, success: null };

    try {
      const snapshot = await dbUserRef
        .orderByChild('email')
        .equalTo(email.email)
        .once('value');
      const exist = snapshot.exists();
      response = {
        code: exist ? 200 : 404,
        success: exist,
      };
      return response;
    } catch (error) {
      throw new Error(
        'Error checking user existence in Firebase: ' + error.message,
      );
    }
  }
}
