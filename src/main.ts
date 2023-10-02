import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import * as admin from 'firebase-admin';
import * as process from 'process';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const privateKey = process.env.FIREBASE_PRIVATE_KY.replace(/\\n/g, '\n');
  fs.writeFileSync('private_key.pem', privateKey);

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: privateKey.replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: process.env.URL_WEBAPP,
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
