import { container } from 'tsyringe';

import ICostumersRepository from '@modules/costumers/repositories/ICostumerRepository';
import CostumersRepository from '@modules/costumers/infra/typeorm/repositories/CostumersRepository';

import IRealtorsRepository from '@modules/realtors/repositories/IRealtorRepository';
import RealtorsRepository from '@modules/realtors/infra/typeorm/repositories/RealtorsRepository';

import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository';
import PropertiesRepository from '@modules/properties/infra/typeorm/repositories/PropertiesRepository';

container.registerSingleton<ICostumersRepository>('CostumersRepository', CostumersRepository);

container.registerSingleton<IRealtorsRepository>('RealtorsRepository', RealtorsRepository);

container.registerSingleton<IPropertiesRepository>('PropertiesRepository', PropertiesRepository);
