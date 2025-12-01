import style from "./SortBar.module.css";
import { useState, useEffect } from "react";
export default function SortBar({ onSortChange, activeIndex }) {
  const [active, setActive] = useState(activeIndex);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);
  const items = [
    "Relevance",
    "Popularity",
    "Price -- Low to High",
    "Price -- High to Low",
    "Newest First",
  ];

  const handleClick = (index) => {
    setActive(index);
    onSortChange(index);
  };
  return (
    <div className={style.sortbar}>
      <h1>Sort By</h1>
      {items.map((item, index) => (
        <h1
          key={index}
          className={active === index ? style.active : ""}
          onClick={() => handleClick(index)}
        >
          {item}
        </h1>
      ))}
    </div>
  );
}
