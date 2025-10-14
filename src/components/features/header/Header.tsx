import Image from "next/image";
import React from "react";
import styles from './Header.module.scss';
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className={styles.header} role="banner">
      <div className={'container'}>
        <Link
          href="/" 
          className={styles.logo_link}
          aria-label="Million Real Estate - Ir al inicio"
        >
          <Image
            className={styles.logo_icon}
            width={32}
            height={32}
            alt=""
            src="/logo_real_estate.svg"
            priority
            quality={100}
          />
          <span className={styles.logo_text}>
            MILLION <span className={styles.logo_accent}>REAL ESTATE</span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;