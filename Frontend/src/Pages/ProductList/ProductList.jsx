import style from "./ProductList.module.css";
import SortBar from "./Components/SortBar";
import FilterBar from "./Components/FilterSidebar";
import ProductCard from "./Components/ProductCard";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EmptySearchPage from "../../Components/EmptySearch/EmptySearch";

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const [data, setData] = useState([]);
  const [sortIndex, setSortIndex] = useState(0);

  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    price: [],
    rating: [],
  });

  // Fetch Data
  const fetchData = async (q) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/search?q=${q}`,
      );
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log("Error fetching search results:", err);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData(query);
      setSortIndex(0);
    } else {
      setData([]);
    }
  }, [query]);

  // FILTER + SORT PIPELINE
  let productsToShow = [...data];

  // BRAND
  if (activeFilters.brand.length > 0) {
    productsToShow = productsToShow.filter((p) =>
      activeFilters.brand.includes(p.brand),
    );
  }

  // PRICE
  if (activeFilters.price.length > 0) {
    productsToShow = productsToShow.filter((p) => {
      const price = p.price || 0;

      return activeFilters.price.some((range) => {
        if (range.includes("Under")) {
          const max = parseInt(range.replace(/\D/g, ""));
          return price < max;
        }
        if (range.includes("Above")) {
          const min = parseInt(range.replace(/\D/g, ""));
          return price > min;
        }

        const nums = range.match(/\d+/g)?.map(Number);
        if (nums?.length === 2) {
          return price >= nums[0] && price <= nums[1];
        }

        return false;
      });
    });
  }

  // RATING
  if (activeFilters.rating.length > 0) {
    const minRating = Math.min(...activeFilters.rating.map(Number));
    productsToShow = productsToShow.filter((p) => (p.rating || 0) >= minRating);
  }

  // SORTING
  if (sortIndex === 2) productsToShow.sort((a, b) => a.price - b.price);
  if (sortIndex === 3) productsToShow.sort((a, b) => b.price - a.price);
  if (sortIndex === 4)
    productsToShow.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

  return (
    <div className={style.productList}>
      {query && data.length > 0 && (
        <FilterBar products={data} onFilterChange={setActiveFilters} />
      )}

      <div className={style.rightSection}>
        {query && data.length > 0 && (
          <>
            <SortBar activeIndex={sortIndex} onSortChange={setSortIndex} />
            <div style={{ fontWeight: "bold", margin: "1rem 0" }}>
              Showing {productsToShow.length} results for "{query}"
              {productsToShow.length === 0 && " (no matches after filters)"}
            </div>

            <div className={style.cardContainer}>
              {productsToShow.length > 0 ? (
                productsToShow.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ProductCard {...item} image={item.image[0].url} />
                  </Link>
                ))
              ) : (
                <div className={style.emptyState}>
                  <h3>No products match your filters</h3>
                  <p>Try adjusting or removing some filters.</p>
                </div>
              )}
            </div>
          </>
        )}

        {!query && (
          <div className={style.emptyState}>
            Please enter a valid category to search!
          </div>
        )}

        {query && data.length === 0 && <EmptySearchPage query={query} />}
      </div>
    </div>
  );
}
