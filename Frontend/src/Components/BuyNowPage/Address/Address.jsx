import style from "./Address.module.css";
import AddressForm from "./AddressForm";
import { useState } from "react";
import AllAddress from "./AllAddress";
export default function Address() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={style.addressContainer}>
      <AllAddress />

      {showForm && (
        <div>
          <AddressForm
            onCancel={() => setShowForm(false)}
            onSave={() => setShowForm(false)}
          />
        </div>
      )}

      {!showForm && (
        <div className={style.address} onClick={() => setShowForm(true)}>
          <i className="fa-solid fa-plus"></i>
          <h6>Add a new address</h6>
        </div>
      )}
    </div>
  );
}
