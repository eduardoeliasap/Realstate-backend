import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import CreateRealtorServices from '../services/CreateRealtorServices';
import UpdateRealtorAvatarServices from '../services/UpdateRealtorAvatarServices';
import RealtorsRepository from '../repositories/RealtorsRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const realtorsRouter = Router();
const upload = multer(uploadConfig);

realtorsRouter.get('/', async (req, res) => {
  const realtorRepository = getCustomRepository(RealtorsRepository);
  const realtor = await realtorRepository.find();

  return res.json(realtor);
});

realtorsRouter.post('/', (req, res) => {
  try {
    const { name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id, creci } = req.body;

    const createRealtor = new CreateRealtorServices();

    const realtor = createRealtor.execute({ name, phone, email, password, cpfcnpj, address, neighborhood, num, city_id, cep, state_id, creci });

    return res.json(realtor);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

realtorsRouter.patch('/avatar/:realtor_id', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
  const { realtor_id } = req.params;

  const createAvatar = new UpdateRealtorAvatarServices();

  const avatar = createAvatar.execute({
    realtor_id,
    avatarFilename: req.file.filename,
    originaFilename: req.file.originalname,
  });

  return res.json({avatar});
});

export default realtorsRouter;
