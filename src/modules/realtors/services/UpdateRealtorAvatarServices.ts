import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../../config/upload';

import Realtor from '../entities/Realtor';
import AvatarRealtor from '../../avatars/entities/AvatarRealtor';

interface Request {
  realtor_id: string;
  avatarFilename: string;
  originaFilename: string;
}

class UpdateRealtorAvatarServices {
  public async execute({ realtor_id, avatarFilename, originaFilename }: Request): Promise<Realtor> {
    try {
      const realtorsRepository = getRepository(Realtor);

      const realtor = await realtorsRepository.findOne(realtor_id);
      if (!realtor)
        throw new Error('Only authenticated realtors can change avatar');

      const avatarRepository = getRepository(AvatarRealtor);

      const avatar = avatarRepository.create({
        name: originaFilename,
        path: avatarFilename,
      });

      await avatarRepository.save(avatar);

      const avatarExists = await avatarRepository.find({ where: { path: avatarFilename } });
      if (!avatarExists){
        throw new Error('Avatar does not exists!');
      }

      realtor.avatar_id = avatarExists[0].id;

      await realtorsRepository.save(realtor);

      return realtor;
    } catch (err) { console.log(err);
     return err; }
  }
}

export default UpdateRealtorAvatarServices;
