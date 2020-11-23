import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './shared/routes';
import uploadConfig from './config/upload';

import './database';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log('Server running..');
});
