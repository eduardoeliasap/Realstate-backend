import { Router } from 'express';
import CreatePropertyServices from '../services/CreatePropertyServices';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdatePropertyPhotosServices from '../services/UpdatePropertyPhotosServices';

const propertyRouter = Router();
const upload = multer(uploadConfig);

propertyRouter.use(ensureAuthenticated);

propertyRouter.get('/', async (req, res) => {

  return res.json({ ok: true });
});

propertyRouter.post('/', (req, res) => {
  try {
    const { costumer_id, realtor_id, contracttype_id, propertytype_id, desc, area, roons, garage, suite, latitude, longitude, price, city_id, state_id, situation, status } = req.body;

    const createProperty = new CreatePropertyServices();

    const property = createProperty.execute({ costumer_id, realtor_id, contracttype_id, propertytype_id, desc, area, roons, garage, suite, latitude, longitude, price, city_id, state_id, situation, status });

    return res.json(property);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

propertyRouter.patch(
  '/photos/:property_id',
  ensureAuthenticated,
  upload.single('file'),
  async (req, res) => {
    const { property_id } = req.params;

    // const updatePropertyPhotos = new UpdatePropertyPhotosServices();

    // const photos = await updatePropertyPhotos.execute({
    //   property_id,
    //   photoFilename: req.file.filename,
    // });

    return res.json({ ok: true });
  }
);

export default propertyRouter;
