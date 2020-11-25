import { Request, Response } from 'express';
import RealtorsRepository from '../../typeorm/repositories/RealtorsRepository';
import UpdateRealtorAvatarServices from '@modules/realtors/services/UpdateRealtorAvatarServices';

export default class RealtorAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { realtor_id } = req.params;

    const realtorRepository = new RealtorsRepository();
    const createAvatar = new UpdateRealtorAvatarServices(realtorRepository);

    const avatar = createAvatar.execute({
      realtor_id,
      avatarFilename: req.file.filename,
      originaFilename: req.file.originalname,
    });

    return res.json({avatar});
  }
}
