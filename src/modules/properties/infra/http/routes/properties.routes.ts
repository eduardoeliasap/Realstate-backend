import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import PropertiesController from '../controllers/PropertiesController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const propertyRouter = Router();
const propertiesController = new PropertiesController();
const upload = multer(uploadConfig);

propertyRouter.use(ensureAuthenticated);

propertyRouter.post('/', propertiesController.create);

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
