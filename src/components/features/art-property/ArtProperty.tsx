
import { Property } from "@/services/repositories/real-estate.repository";
import Image from "next/image";
import React from "react";
import styles from './ArtProperty.module.scss';
import { formatToUSD } from "@/helpers/format-to-usd";
import Link from "next/link";
import { DEFAULT_IMAGE } from "@/constants/images";
import { motion } from "framer-motion";

interface ArtPropertyProps {
  property: Property
}

export const ArtProperty: React.FC<ArtPropertyProps> = ({ property }) => {
  return (
    <motion.article
      className={styles.card}
      itemScope
      itemType="https://schema.org/Apartment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.1,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Link
        href={`/detail/${property._id}`}
        className={styles.card_link}
        aria-label={`Ver detalles de ${property.name}`}
      >
        <div className={styles.image_card}>
          <Image
            src={property.image || DEFAULT_IMAGE}
            alt={`Propiedad ${property.name} en ${property.addressProperty}`}
            fill
            className={styles.image}
            loading="lazy"
            itemProp="image"
            quality={85}
          />
        </div>
        <div className={styles.card_content}>
          <header>
            <p className={styles.price}>
              <strong
                itemProp="price"
                content={property.priceProperty.toString()}
              >
                {formatToUSD(property.priceProperty)}
              </strong>
              <span itemProp="priceCurrency" content="USD"> USD</span>
            </p>
            <h3 itemProp="name" className={styles.name}>
              {property.name}
            </h3>
          </header>
          <address 
            itemProp="address" 
            itemScope 
            itemType="https://schema.org/PostalAddress"
            className={styles.address}
          >
            <span itemProp="streetAddress">{property.addressProperty}</span>,{" "}
          </address>
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <meta itemProp="description" content={`Propiedad en venta: ${property.name}`} />
          <meta itemProp="propertyID" content={property._id.toString()} />
        </div>
      </Link>
    </motion.article>
  );
};

