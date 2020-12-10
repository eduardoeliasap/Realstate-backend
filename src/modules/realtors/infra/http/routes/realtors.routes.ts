import { Router } from 'express';
import multer from 'multer';

import RealtorsController from '../controllers/RealtorsController';
import RealtorAvatarController from '../controllers/RealtorAvatarController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const realtorsRouter = Router();
const realtorsController = new RealtorsController();
const realtorAvatarController = new RealtorAvatarController();
const upload = multer(uploadConfig);

realtorsRouter.get('/', realtorsController.index);

realtorsRouter.post('/', realtorsController.create);

realtorsRouter.patch('/avatar/:realtor_id', ensureAuthenticated, upload.single('avatar'), realtorAvatarController.update);

export default realtorsRouter;
