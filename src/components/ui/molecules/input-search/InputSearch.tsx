import React from "react";
import Image from 'next/image';
import styles from './InputSearch.module.scss'

interface InputSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export const InputSearch:React.FC<InputSearchProps> = ({ search, setSearch }) => {
  
  return (
    <form className={styles.input_search}>
      <Image
        className={styles.icon}
        src="/icon_search.svg"
        width={24}
        height={24}
        alt="Casa en renta en Palm Harbor, Beverly Springfield"
        loading="lazy"
        itemProp="image"
      />
      <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
    </form>
  )
}