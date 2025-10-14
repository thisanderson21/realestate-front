import { ListProperties } from "@/components/features/list-properties/ListProperties";
import { repositoryContainer } from "@/services/inversify.conf";
import { RealEstateRepository } from "@/services/repositories/real-estate.repository";
import { TYPES } from "@/services/types";
import { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Propiedades en venta - Million Real Estate",
    description: "Explora propiedades en el sur de la Florida. Filtra por nombre, dirección o precio.",
    openGraph: {
      title: "Propiedades en venta",
      description: "Encuentra tu próximo hogar con Million.",
      images: ["/og-image.jpg"]
    }
  };
}

export default async function PropertiesPage() {
  const repository = repositoryContainer.get(TYPES.REAL_ESTATE_REPOSITORY) as RealEstateRepository;
  const properties = await repository.getPropertiesFilter({});

  console.log(properties, 'propertiespropertiespropertiesproperties')
  return (
    <main>
      <ListProperties initialData={properties} /> 
    </main>
  );
}
