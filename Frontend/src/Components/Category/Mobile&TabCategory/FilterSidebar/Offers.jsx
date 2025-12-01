import { useState } from "react";

export default function Offers() {
  let [showoffers, setShowOffers] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="offers">
        <div className="header" onClick={() => setShowOffers(!showoffers)}>
          <span>OFFERS</span>
          <i
            className={
              showoffers === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showoffers && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                Special Price
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
                Buy More, Save More
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
                No Cost EMI
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
