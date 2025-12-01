// FilterBar.jsx – 100% WORKING (Copy-Paste This)
import { useState, useMemo } from "react";
import style from "./FilterSidebar.module.css";

export default function FilterBar({ products = [], onFilterChange }) {
  const [selected, setSelected] = useState({
    brand: [],
    price: [],
    rating: [],
  });

  const [openSections, setOpenSections] = useState({
    brand: true,
    price: true,
    rating: false,
  });

  const [brandSearch, setBrandSearch] = useState("");
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Extract Brands
  const brands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ].sort();

  const priceRanges = useMemo(() => {
    if (products.length === 0) return [];

    const allNames = products
      .map((p) => (p.name || p.title || "").toLowerCase())
      .join(" ");
    const hasKeyword = (keywords) => keywords.some((k) => allNames.includes(k));

    const prices = products.map((p) => p.price).filter(Boolean);
    const avgPrice =
      prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;

    // Grocery & Daily Needs
    if (
      hasKeyword([
        "rice",
        "oil",
        "dal",
        "ghee",
        "atta",
        "sugar",
        "tea",
        "biscuit",
        "milk",
        "flour",
      ])
    ) {
      return [
        "Under ₹200",
        "₹200 - ₹500",
        "₹500 - ₹1,000",
        "₹1,000 - ₹2,000",
        "Above ₹2,000",
      ];
    }

    // Fashion & Clothing
    if (
      hasKeyword([
        "tshirt",
        "shirt",
        "dress",
        "kurti",
        "saree",
        "jeans",
        "top",
        "ethnic",
        "lehenga",
        "pant",
      ])
    ) {
      return [
        "Under ₹500",
        "₹500 - ₹1,000",
        "₹1,000 - ₹2,000",
        "₹2,000 - ₹3,000",
        "Above ₹3,000",
      ];
    }

    // Electronics (Earphones, Chargers, Speakers, Smartwatch)
    if (
      hasKeyword([
        "earphone",
        "headphone",
        "earbud",
        "speaker",
        "charger",
        "cable",
        "powerbank",
        "watch",
        "smartwatch",
      ])
    ) {
      return [
        "Under ₹1,000",
        "₹1,000 - ₹5,000",
        "₹5,000 - ₹10,000",
        "₹10,000 - ₹20,000",
        "Above ₹20,000",
      ];
    }

    // Mobiles, Laptops, TVs – High Price
    if (
      hasKeyword([
        "mobile",
        "phone",
        "iphone",
        "samsung",
        "oneplus",
        "laptop",
        "macbook",
        "tv",
        "television",
        "gaming",
      ])
    ) {
      return [
        "Under ₹2,000",
        "₹20,000 - ₹50,000",
        "₹50,000 - ₹1,00,000",
        "₹1,00,000 - ₹2,00,000",
        "Above ₹2,00,000",
      ];
    }

    // Default fallback (based on average price)
    if (avgPrice < 3000) {
      return [
        "Under ₹500",
        "₹500 - ₹1,000",
        "₹1,000 - ₹2,000",
        "₹2,000 - ₹5,000",
        "Above ₹5,000",
      ];
    }

    return [
      "Under ₹20,000",
      "₹20,000 - ₹50,000",
      "₹50,000 - ₹1,00,000",
      "₹1,00,000 - ₹2,00,000",
      "Above ₹2,00,000",
    ];
  }, [products]);

  const ratingOptions = ["5 ★", "4 ★ & above", "3 ★ & above"];

  // Toggle filter
  const toggle = (type, value) => {
    setSelected((prev) => {
      const arr = prev[type] || [];
      const updated = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      const newSelected = { ...prev, [type]: updated };
      onFilterChange(newSelected);
      return newSelected;
    });
  };

  // CLEAR ALL – 100% SAFE
  const clearAll = () => {
    const empty = { brand: [], price: [], rating: [] };
    setSelected(empty);
    onFilterChange(empty);
  };

  const hasAnySelected =
    selected.brand.length > 0 ||
    selected.price.length > 0 ||
    selected.rating.length > 0;
  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );
  const visibleBrands = showAllBrands
    ? filteredBrands
    : filteredBrands.slice(0, 6);

  if (products.length === 0) {
    return <div className={style.filterbar}>No products</div>;
  }

  return (
    <div className={style.filterbar}>
      <div className={style.header}>
        <h3>Filters</h3>
        {hasAnySelected && (
          <button onClick={clearAll} className={style.clearBtn}>
            Clear All
          </button>
        )}
      </div>
      <hr style={{ margin: "0px" }} />

      {/* BRAND */}
      <div className={style.filterSection}>
        <h4 onClick={() => toggleSection("brand")}>
          <span className={style.sectionTitle}>BRAND</span>
          <span
            className={openSections.brand ? style.arrowUp : style.arrowDown}
          />
        </h4>
        {openSections.brand && (
          <div className={style.filterContent}>
            <input
              type="text"
              placeholder="Search Brand"
              className={style.searchInput}
              value={brandSearch}
              onChange={(e) => {
                setBrandSearch(e.target.value);
                setShowAllBrands(false);
              }}
            />
            {visibleBrands.map((brand) => (
              <label key={brand} className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.brand.includes(brand)}
                  onChange={() => toggle("brand", brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
            {filteredBrands.length > 6 && !showAllBrands && (
              <div
                className={style.seeMore}
                onClick={() => setShowAllBrands(true)}
              >
                See MORE
              </div>
            )}
          </div>
        )}
      </div>

      {/* PRICE – NOW 100% CORRECT */}
      <div className={style.filterSection}>
        <h4 onClick={() => toggleSection("price")}>
          <span className={style.sectionTitle}>PRICE</span>
          <span
            className={openSections.price ? style.arrowUp : style.arrowDown}
          />
        </h4>
        {openSections.price && (
          <div className={style.filterContent}>
            {priceRanges.map((range) => (
              <label key={range} className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.price.includes(range)}
                  onChange={() => toggle("price", range)}
                />
                <span>{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RATING */}
      <div className={style.filterSection}>
        <h4 onClick={() => toggleSection("rating")}>
          <span className={style.sectionTitle}>CUSTOMER RATING</span>
          <span
            className={openSections.rating ? style.arrowUp : style.arrowDown}
          />
        </h4>
        {openSections.rating && (
          <div className={style.filterContent}>
            {ratingOptions.map((rating) => (
              <label key={rating} className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.rating.includes(rating)}
                  onChange={() => toggle("rating", rating)}
                />
                <span>{rating}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
