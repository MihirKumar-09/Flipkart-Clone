import { useState } from "react";

export default function NetworkType() {
  let [networkType, setNetworkType] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="network">
        <div className="header" onClick={() => setNetworkType(!networkType)}>
          <span>NETWORK TYPE</span>
          <i
            className={
              networkType === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {networkType && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                2 G
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
                3 G
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
                4 G
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
                4 G VOLTE
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
                5.5 G
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
                5 G
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
