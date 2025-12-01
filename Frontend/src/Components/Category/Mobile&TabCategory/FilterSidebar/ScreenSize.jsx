import { useState } from "react";

export default function ScreenSize() {
  let [showScreenSize, setShowScreenSize] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="sim">
        <div
          className="header"
          onClick={() => setShowScreenSize(!showScreenSize)}
        >
          <span>SCREEN SIZE</span>
          <i
            className={
              showScreenSize === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showScreenSize && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                5.7 - 5.9 inch
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
                5.5 - 5.6 inch
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
                5.2 - 5.4 inch
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
                6.4 inch & Above
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
                6 - 6.3 inch
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
                6 inch Above
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
