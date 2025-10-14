
"use client"

import React, { useState } from "react";
import styles from './ListProperties.module.scss';
import { InputSearch } from "@/components/ui/molecules/input-search/InputSearch";
import { PriceRangeSelector } from "@/components/ui/molecules/price-range/PriceRange";
import { useQuery } from "@tanstack/react-query";
import useRealEstateRepository from "@/hooks/use-realestate-repository";
import { useDebounce } from "use-debounce";
import { ArtProperty } from "../art-property/ArtProperty";

import { NoResults } from "../no-results/NoResults";
import { Property } from "@/services/repositories/real-estate.repository";

interface Props {
  initialData: Property[];
}

export const ListProperties = ({ initialData }: Props) => {
  const repository = useRealEstateRepository()
  const [search, onSearch] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  
  const [debouncedSearch] = useDebounce(search, 500);

  const shouldFetch = debouncedSearch.trim() !== '' || priceRange[0] > 0 || priceRange[1] > 0;

  const query = useQuery({
    queryKey: ["properties", debouncedSearch, priceRange],
    queryFn: () => {
      return repository.getPropertiesFilter({
        search: debouncedSearch,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      })
    }, 
    placeholderData: initialData,
    enabled: shouldFetch, // Solo fetch cuando hay filtros activos
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos en caché
    refetchOnWindowFocus: false, // No refetch al cambiar de pestaña
    refetchOnMount: false, // No refetch al montar si hay datos en caché
  });

  const { data = [], isLoading, isError } = query;

  return (
    <div className="container">
      <div  className={styles.header_title}>
        <h2 >Based on your location</h2>
        <p>Some of our picked properties near you location.</p>
      </div>
      <div className={styles.filters}>
        <PriceRangeSelector
          onChangeFilter={(filters) => {
            console.log(filters, 'ENTREEEEEEEEEEEE')
            setPriceRange(filters)
          }}
        />
        <InputSearch
          search={search} 
          setSearch={onSearch}
        />
      </div>
      <div className={styles.list_content}>
        {
          data.map((property, ind) => (
            <ArtProperty
              property={property} key={property.idOwner + ind}
            />
          ))
        }
        {!isLoading && !isError && data.length === 0 && <NoResults />}
      </div>
    </div>
  );
};
