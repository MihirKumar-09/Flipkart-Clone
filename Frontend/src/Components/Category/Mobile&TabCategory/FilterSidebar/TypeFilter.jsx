import { useState } from "react";

export default function Type() {
  let [showType, setShowType] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="type">
        <div className="header" onClick={() => setShowType(!showType)}>
          <span>TYPE</span>
          <i
            className={
              showType === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showType && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                Smartphones
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
                Features Phones
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
