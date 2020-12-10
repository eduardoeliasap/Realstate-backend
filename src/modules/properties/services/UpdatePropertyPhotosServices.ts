import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '@config/upload';

import Property from '@modules/properties/infra/typeorm/entities/Property';
import PropertyPhoto from '@modules/propertyphotos/infra/typeorm/entities/PropertyPhoto';

interface Request {
  property_id: string;
  photoFilename: string;
}

class UpdatePropertyPhotosServices {
  public async execute({ property_id, photoFilename }: Request): Promise<PropertyPhoto> {
    const propertiesRepository = getRepository(Property);
    const propertyPhotosRepository = getRepository(PropertyPhoto);

    const property = await propertiesRepository.findOne(property_id);
    if (!property)
      throw new Error('Only authenticated users can change avatar');

    const propertyPhotoPathFileName = path.join(uploadConfig.tmpFolder, photoFilename);

    const propertyPhotos = propertyPhotosRepository.create({
      name: photoFilename,
      path: propertyPhotoPathFileName,
      property_id,
    });

    await propertyPhotosRepository.save(propertyPhotos);

    return propertyPhotos;
  }
}

export default UpdatePropertyPhotosServices;
