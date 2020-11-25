import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import multer from 'multer';
import CreateRealtorServices from '@modules/realtors/services/CreateRealtorServices';
import UpdateRealtorAvatarServices from '@modules/realtors/services/UpdateRealtorAvatarServices';
import RealtorsRepository from '@modules/realtors/infra/typeorm//repositories/RealtorsRepository';

import RealtorsController from '../controllers/RealtorsController';
import RealtorAvatarController from '../controllers/RealtorAvatarController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const realtorsRouter = Router();
const realtorsController = new RealtorsController();
const realtorAvatarController = new RealtorAvatarController();
const upload = multer(uploadConfig);

realtorsRouter.get('/', async (req, res) => {
  const realtorRepository = getRepository(RealtorsRepository);
  const realtor = await realtorRepository.find();

  return res.json(realtor);
});

realtorsRouter.post('/', realtorsController.create);

realtorsRouter.patch('/avatar/:realtor_id', ensureAuthenticated, upload.single('avatar'), realtorAvatarController.update);

export default realtorsRouter;
