import style from "./AllAddress.module.css";
import { useEffect, useState } from "react";
export default function allAddress() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const fetchAllAddress = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/all/address", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      //check backend format;
      if (Array.isArray(data.allAddress)) {
        setAddresses(data.allAddress);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllAddress();
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]._id);
    }
  }, [addresses]);

  return (
    <div className={style.list}>
      <div className={style.head}>
        <h3>DELIVERY ADDRESS</h3>
      </div>
      {addresses.length === 0 ? (
        <span></span>
      ) : (
        addresses.map((addr) => (
          <label
            key={addr._id}
            className={`${style.card} ${
              selectedAddress === addr._id ? style.activeCard : ""
            }`}
          >
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedAddress === addr._id}
              onChange={() => setSelectedAddress(addr._id)}
              className={style.radio}
            />
            <div className={style.top}>
              <div className={style.name}>
                <p>{addr.name}</p>
                <p>{addr.mobile}</p>
              </div>
              <p className={style.address}>{addr.address}</p>
              <div className={style.cityPincode}>
                <p>{addr.city} -</p>
                <p>{addr.pincode}</p>
              </div>
              {selectedAddress === addr._id && (
                <button className={style.button}>DELEVER HERE</button>
              )}
            </div>
          </label>
        ))
      )}
    </div>
  );
}
