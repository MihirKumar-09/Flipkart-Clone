import style from "./Address.module.css";
import AddressForm from "./AddressForm";
import { useEffect, useEffectEvent, useState } from "react";
import AllAddress from "./AllAddress";
export default function Address() {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const fetchAllAddress = async () => {
    const res = await fetch("http://localhost:8080/api/all/address", {
      credentials: "include",
    });
    const data = await res.json();

    if (Array.isArray(data.allAddress)) {
      setAddresses(data.allAddress);
    }
  };

  useEffect(() => {
    fetchAllAddress();
  });

  return (
    <div className={style.addressContainer}>
      <AllAddress addresses={addresses} />

      {showForm && (
        <div>
          <AddressForm
            onCancel={() => setShowForm(false)}
            onSave={() => {
              fetchAllAddress();
              setShowForm(false);
            }}
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
