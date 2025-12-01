import { useState } from "react";

export default function OperatingSystem() {
  let [showOperaingSystem, setShowOperatingSystem] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="system">
        <div
          className="header"
          onClick={() => setShowOperatingSystem(!showOperaingSystem)}
        >
          <span>OPERATING SYSTEM</span>
          <i
            className={
              showOperaingSystem === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showOperaingSystem && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                Android
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
                iOS
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
