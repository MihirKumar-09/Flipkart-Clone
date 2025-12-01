import { useState } from "react";

export default function Brand() {
  let [showBrands, setShowBrands] = useState(true);

  return (
    <div className="filter-sidebar">
      <div className="filter">
        <span>Filters</span>
      </div>
      <hr />
      <div className="brands">
        <div className="header" onClick={() => setShowBrands(!showBrands)}>
          <span>BRAND</span>
          <i
            className={
              showBrands === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        <div className="search">
          {showBrands && (
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search Brands" />
            </div>
          )}
        </div>
        {showBrands && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                Apple
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="oppo"
                id="brand-oppo"
              />
              <label className="form-check-label" htmlFor="brand-oppo">
                OPPO
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="oppo"
                id="brand-oppo"
              />
              <label className="form-check-label" htmlFor="brand-oppo">
                Vivo
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="oppo"
                id="brand-oppo"
              />
              <label className="form-check-label" htmlFor="brand-oppo">
                Smasung
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="oppo"
                id="brand-oppo"
              />
              <label className="form-check-label" htmlFor="brand-oppo">
                Lenovo
              </label>
            </div>
          </div>
        )}
        {showBrands && <span className="see-more">See MORE</span>}
      </div>
      <hr />
    </div>
  );
}
