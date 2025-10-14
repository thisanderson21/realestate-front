import { RealEstateRepository } from '@/services/repositories/real-estate.repository';
import { TYPES } from '@/services/types';
import { useRepositoryIoc } from '@/services/context';

const useRealEstateRepository = (): RealEstateRepository => {
  const { container } = useRepositoryIoc();

  return container.get(TYPES.REAL_ESTATE_REPOSITORY);
};

export default useRealEstateRepository;
