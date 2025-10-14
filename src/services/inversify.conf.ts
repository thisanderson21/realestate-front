import 'reflect-metadata';
import { Container } from 'inversify';

import { RealEstateRepository } from './repositories/real-estate.repository';
import { RealEstateRepositoryService } from './repositories/real-estate.repository.service';
import { TYPES } from './types';

const repositoryContainer = new Container();

repositoryContainer.bind<RealEstateRepository>(TYPES.REAL_ESTATE_REPOSITORY).to(RealEstateRepositoryService);

export {repositoryContainer};
