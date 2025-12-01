import { useState, useEffect } from "react";

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const min = 0;
  const max = 30000;

  useEffect(() => {
    const slider = document.querySelector(".slider-track");
    const percent1 = ((minPrice - min) / (max - min)) * 100;
    const percent2 = ((maxPrice - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #dcdcdc ${percent1}%, #2874f0 ${percent1}%, #2874f0 ${percent2}%, #dcdcdc ${percent2}%)`;
  }, [minPrice, maxPrice]);

  return (
    <div className="filter-sidebar">
      <div className="price">
        <div className="header">
          <span>PRICE</span>
        </div>

        <div className="price-slider">
          <div className="slider-track"></div>

          <input
            type="range"
            min={min}
            max={max}
            step="1000"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
            }
          />
          <input
            type="range"
            min={min}
            max={max}
            step="1000"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
            }
          />
        </div>

        <div className="price-dropdowns">
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          >
            <option value="0">Min</option>
            <option value="5000">₹5000</option>
            <option value="10000">₹10000</option>
            <option value="15000">₹15000</option>
            <option value="20000">₹20000</option>
            <option value="25000">₹25000</option>
          </select>
          <span>to</span>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          >
            <option value="10000">₹10000</option>
            <option value="20000">₹20000</option>
            <option value="30000">₹30000+</option>
          </select>
        </div>
      </div>
      <hr />
    </div>
  );
}
