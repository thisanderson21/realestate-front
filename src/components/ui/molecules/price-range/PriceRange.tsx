import React, { useState } from "react";
import styles from "./PriceRangeSelector.module.scss";
import { Button } from "../../atoms/Button";
import { formatToUSD } from "@/helpers/format-to-usd";

interface PriceRangeSelectorProps {
  onChangeFilter: (filters: [number, number]) => void;
}

export const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  onChangeFilter,
}) => {
  const [selectedRange, setSelectedRange] = useState<[number, number]>([1000, 3000]);
  const [active, setActive] = useState(false);

  const handleClick = () => setActive((prev) => !prev);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);

    setSelectedRange(([min, max]) => {
      if (type === "min") {
        return [Math.min(value, max), max];
      } else {
        return [min, Math.max(value, min)];
      }
    });
  };

  const handleClear = () => {
    setActive(false);
    onChangeFilter([0, 0]);
    setSelectedRange([0, 0]);
  };

  const handleApply = () => {
    onChangeFilter(selectedRange);
    setActive(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.toggle} ${active ? styles.active : ""}`}
        onClick={handleClick}
        type="button"
      >
        Price range 💰
      </button>

      {active && (
        <div className={styles.rangeBox}>
          <div className={styles.values}>
            <span>Min: {formatToUSD(selectedRange[0])}</span>
            <span>Max: {formatToUSD(selectedRange[1])}</span>
          </div>

          <div className={styles.inputs}>
            <input
              type="range"
              min="0"
              max="5000000"
              step="100"
              value={selectedRange[0]}
              onChange={(e) => handleChange(e, "min")}
            />
            <input
              type="range"
              min="0"
              max="5000000"
              step="100"
              value={selectedRange[1]}
              onChange={(e) => handleChange(e, "max")}
            />

            <div className={styles.actions}>
              <Button variant="secondary" size="small" onClick={handleClear}>
                Clear
              </Button>
              <Button size="small" onClick={handleApply}>
                To apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
