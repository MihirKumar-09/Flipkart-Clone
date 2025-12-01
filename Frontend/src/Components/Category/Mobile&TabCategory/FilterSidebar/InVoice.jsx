import { useState } from "react";

export default function InVoice() {
  let [showInVoice, setShowInVoice] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="invoice">
        <div className="header" onClick={() => setShowInVoice(!showInVoice)}>
          <span>GST INVOICE AVAILABLE</span>
          <i
            className={
              showInVoice === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showInVoice && (
          <div className="brand-options">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="apple"
                id="brand-apple"
              />
              <label className="form-check-label" htmlFor="brand-apple">
                GST Invoice Available
              </label>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
