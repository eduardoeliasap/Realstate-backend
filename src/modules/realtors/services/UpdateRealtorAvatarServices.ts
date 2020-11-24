import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

import IRealtorRepository from '../repositories/IRealtorRepository';
import Realtor from '../infra/typeorm/entities/Realtor';
import AvatarRealtor from '../../avatars/infra/typeorm/entities/AvatarRealtor';

interface Request {
  realtor_id: string;
  avatarFilename: string;
  originaFilename: string;
}

class UpdateRealtorAvatarServices {
  constructor(
    private realtorRepository: IRealtorRepository) {}

  public async execute({ realtor_id, avatarFilename, originaFilename }: Request): Promise<Realtor> {
    try {
      // const realtorsRepository = getRepository(Realtor);

      const realtor = await this.realtorRepository.findById(realtor_id);
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

      await this.realtorRepository.save(realtor);

      return realtor;
    } catch (err) { console.log(err);
     return err; }
  }
}

export default UpdateRealtorAvatarServices;
