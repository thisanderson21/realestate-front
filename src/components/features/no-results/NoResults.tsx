"use client";

import React from "react";
import { LottieAnimation } from "@/components/ui/molecules/lottie-animation/LottieAnimation";
import emptyAnimation from "@/assets/empty-animation.json";
import styles from "./NoResults.module.scss";

interface NoResultsProps {
  title?: string;
  suggestions?: string[];
  animationData?: object;
  width?: number;
  height?: number;
}

export const NoResults: React.FC<NoResultsProps> = ({
  title = "No hay resultados que coincidan con tu búsqueda.",
  suggestions = [
    "Revisa la ortografía de la palabra.",
    "Utiliza palabras más genéricas o menos palabras.",
  ],
  animationData = emptyAnimation,
  width = 250,
  height = 250,
}) => {
  return (
    <div className={styles.noResults}>
      <LottieAnimation
        animationData={animationData}
        width={width}
        height={height}
      />
      <div className={styles.text}>
        <h3>{title}</h3>
        {suggestions?.length > 0 && (
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
