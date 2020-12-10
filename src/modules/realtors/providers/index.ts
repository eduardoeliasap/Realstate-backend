import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCriptyHashProvider from './HashProvider/implementations/BCriptyHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCriptyHashProvider);

