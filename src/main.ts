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
  const privateKey =
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZjeCPfL+vWcaM\nBfKZEeBqXk1HO4d6Dw7kL/zqW3yZ7QeyiqUMAwrRIZDSEWs7fAehgvQYnNZiK8uj\nWW/6ar3aztfoEOuFLQgY3MeayQILd/nMgWbcrUVJOthJb5heK1ehr72+PyewhU6H\nSzD21T28ctn6B7wXihmQ591O+KlPFfeAefm0hNdBx6QmZmWD2hPLMhzsqEAMzr6d\nlw1YAfeNIk61eFUosE5sONHza8izGCQqOGS3wSprTrM5z9Kh4b/p8t+xU4U5NnxS\nOHYhxIR1WWZ8OzjLP7F25lFu5nyvaGZHTLGZ0h2FaGXWFCHE29+BZWWPUdn1c8KO\n5PoYE31JAgMBAAECggEABnD1RSubWlqSmbPTqwBdGLUrOnRYsOHyEtgg/L849TeE\nUcTfWsdDZEWrTqaQqBqCMvAcd25Xz18tMAVbzUY+P9AarjdMe+YJT4quXFO3gF3o\nZn/cnd/uVr2vTjhOTM/2YXfO5qy9SFo1MrdwnsAP8ohiVKrPpPCj9ShGyC3l40V0\n1Obu2bEAZTTp1/lY2qZhK1WVM1xiymeO6k7uKWBszaCAaRVed5nOINNP9qxs8Al+\nnb96Xk2smZc5AAVbVq43ASUbXA6HstAuIRMf/jAmB1tGnu7mhhoz7YJWYiaX6+3j\nNtIHaDGuzotn88M7DNidVl/AbyCVuzK/ZcgmCWzFoQKBgQDTdhz0c8gTYgRAccJh\nHHsJLXKouZuaddhWQVEnsztErDsuuaVxvx36hHxPUWSBcsmSe8r4/vxYe4RHehHP\nC+iykNhfGjeE68Bo3GDg6tETTyDGm4MnWfclfUhUljub2ph7sylLdEj0uC4n+Ehe\nsy/b+Vx0hFJdfxiYcQmDN62UIQKBgQC55XCQYAE2WKy+ruhcQ2esBU8xn5u2Ye7M\n2ZTC5ItFZhtNyoOCjuYyRstw3B9o0xsp9RjePtXM3zJkpi6t/jFrXcXAJDV7FcBk\nPe86rB5Ky3hbIqhzf4hyrFBkszw1mpJHy9YuT83b5dmGT2LPLd9Ccm8uuSqjL40y\nPRhM9C5EKQKBgQDE9TSO8/CdLSRsqgi0zwRCThSH1yl5ut3fqULfyW8gzZLqOHxC\n8BIKLrBiaJtGfxYE3Ez3kviTqahRsv83bA43k/YUzqR7p+I1SV7q34wRghgzJNIK\nKx+pyYE/WBb5WafBP+TspMj3Nz22eOlfW2LubtqQpFbbQvAzvMVxdMC2QQKBgBDp\nSIY51aJmCsEGFGlgUGwbx4qSJI5A9oJ4QMpCFFFp6o33IGOeMF7ehd9shwb4PX5h\np7OAL98FZwY1AAYgG8rSqwzBvoPGBMyZvcuuoMrZG8ferUhkj7su5dljXNTbjPcv\nGfr4k5evn0xSqICEgcz/sBGmErTpvISXfkBx7kuRAoGBAMTw0dQ8LEkCJhHcZIF8\n0AdXGYnrlZZA1lBmIaThoCcW5kRRBUlAdOj+4iI3KPfmBePOt/SWSG+HdPNULs0L\ndkpxPwtnrjEYvGReHRSAgmTZBNoMdKsGq1HxmgwopS4ork94+MnBZaESTtHDnIp9\nEBee9eaFykNvIUWUzkAm+pUV\n-----END PRIVATE KEY-----\n';

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }),
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
