import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import * as admin from 'firebase-admin';
import * as process from 'process';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();

  const serviceAccount = require('../firebase-account-key.json');

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(options);

  await app.listen(process.env.PORT);
}
bootstrap();
