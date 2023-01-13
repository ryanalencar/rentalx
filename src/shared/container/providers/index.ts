import { container } from 'tsyringe';

import { Singletons } from '..';

import { IDateProvider } from './date-provider/IDateProvider';
import { DayjsDateProvider } from './date-provider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>(
  Singletons.DayjsDateProvider,
  DayjsDateProvider,
);
