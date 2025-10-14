import { Property } from "@/services/repositories/real-estate.repository";
import Image from "next/image";
import React from "react";
import styles from "./PropertyDetail.module.scss";
import { formatToUSD } from "@/helpers/format-to-usd";
import { DEFAULT_IMAGE } from "@/constants/images";
import { Button } from "@/components/ui/atoms/Button";

interface PropertyDetailProps {
  property: Property;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <section
      className={`${styles.detail} container`}
      itemScope
      itemType="https://schema.org/SingleFamilyResidence"
    >
      <div className={styles.detail_left}>
        <div className={styles.image_wrapper}>
          <Image
            src={property.image || DEFAULT_IMAGE}
            alt={property.name}
            fill
            className={styles.image}
            priority
            itemProp="image"
          />
          <div className={`${styles.badge} ${styles.badge_top}`}>
            <div className={styles.badge_icon}>
              <Image
                src="/icon_play.svg"
                alt="Virtual tour icon"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h3>Virtual home tour</h3>
              <p>We provide you with virtual tour</p>
            </div>
          </div>
          <div className={`${styles.badge} ${styles.badge_bottom}`}>
            <div className={styles.badge_icon_home}>
              <Image
                src="/icon_home.svg"
                alt="Home icon"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h3>Find the best deal</h3>
              <p>Browse thousands of properties</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detail_right}>
        <div className={styles.property_info}>
          <p className={styles.price}>
            <strong
              itemProp="price"
              content={property.priceProperty.toString()}
            >
              {formatToUSD(property.priceProperty)}
            </strong>{" "}
            <span itemProp="priceCurrency" content="USD">
              USD
            </span>
          </p>
          <h1 itemProp="name" className={styles.name}>
            {property.name}
          </h1>
          <address
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
            className={styles.address}
          >
            <span itemProp="streetAddress">{property.addressProperty}</span>
          </address>
        </div>
        <h2 className={styles.title}>
          We make it easy for <br />
          <span>tenants and landlords.</span>
        </h2>
        <p className={styles.description}>
          This property could be yours today. We’ll help you with everything:
          pre-approved financing, inspection, negotiation, and express closing.
          No hassles, no surprises — just you and your new home.
        </p>
        <Button>
          See more
        </Button>
      </div>
    </section>
  );
};
