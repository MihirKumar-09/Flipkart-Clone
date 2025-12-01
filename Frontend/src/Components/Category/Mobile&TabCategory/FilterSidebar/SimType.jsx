import { useState } from "react";

export default function SimType() {
  let [showSimType, setShowSimType] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="sim">
        <div className="header" onClick={() => setShowSimType(!showSimType)}>
          <span>SIM TYPE</span>
          <i
            className={
              showSimType === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showSimType && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                Dual Sim
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
                Dual Sim(Nano + eSIM)
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
                Dual Sim(Physical + eSIM)
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
                Single Sim
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
