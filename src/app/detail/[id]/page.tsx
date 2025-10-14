import { PropertyDetail } from "@/components/features/property-detail/PropertyDetail";
import { repositoryContainer } from "@/services/inversify.conf";
import { Property, RealEstateRepository } from "@/services/repositories/real-estate.repository";
import { TYPES } from "@/services/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Caché de propiedades en build time (solo lectura)
let propertiesCache: Property[] | null = null;

async function getAllProperties(): Promise<Property[]> {
  if (propertiesCache) {
    return propertiesCache;
  }

  const repository = repositoryContainer.get(TYPES.REAL_ESTATE_REPOSITORY) as RealEstateRepository;
  propertiesCache = await repository.getPropertiesFilter({});
  return propertiesCache;
}


export async function generateStaticParams() {
  try {
    const properties = await getAllProperties();
    
    return properties.map((property) => ({
      id: property._id
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Metadata usando el caché
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const properties = await getAllProperties();
  const property = properties.find(p => p._id.toString() === id);
  
  if (!property) {
    return {
      title: "Propiedad no encontrada",
    };
  }

  return {
    title: `${property.name} - Million Real Estate`,
    description: property.image || `Propiedad en ${property.addressProperty}`,
    openGraph: {
      title: property.name,
      description: property.addressProperty,
      images: property.image ? [{
        url: property.image,
        width: 1200,
        height: 630,
        alt: property.name,
      }] : [],
    },
  };
}

export default async function PropertyPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  try {
    const { id } = await params;
    const properties = await getAllProperties();
    const property = properties.find(p => p._id.toString() === id);

    if (!property) {
      notFound();
    }

    return (
      <main>
        <PropertyDetail property={property} />
      </main>
    );
  } catch (error) {
    console.error("Error loading property:", error);
    notFound();
  }
}