import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { request } from 'express';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const fileHash = crypto.randomBytes(10).toString('hex');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const id = request.user.id;

      const [, estension ] = file.originalname.split('.');
      /* *** Pendencia ***
       * A tratativa de erro não esta ocorrendo caso a imagem não for PNG
       */
      // if (estension !== 'png')
      //   return;

      const fileName = `${Date.now()}.${estension}`;

      return callback(null, fileName);
    },
  }),
};
