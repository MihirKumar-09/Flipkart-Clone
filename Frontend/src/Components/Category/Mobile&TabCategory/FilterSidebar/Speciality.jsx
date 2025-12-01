import { useState } from "react";

export default function Speciality() {
  let [showSpeciality, setShowSpeciality] = useState(false);
  return (
    <div className="filter-sidebar">
      <div className="speciality">
        <div
          className="header"
          onClick={() => setShowSpeciality(!showSpeciality)}
        >
          <span>SPECIALITY</span>
          <i
            className={
              showSpeciality === true
                ? "fa-solid fa-angle-down"
                : "fa-solid fa-angle-up"
            }
          ></i>
        </div>
        {showSpeciality && (
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
