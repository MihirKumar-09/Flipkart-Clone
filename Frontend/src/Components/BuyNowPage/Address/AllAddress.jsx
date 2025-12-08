import style from "./AllAddress.module.css";
import { useEffect, useState } from "react";
export default function allAddress() {
  const [addresses, setAddresses] = useState([]);
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
  return (
    <div className={style.list}>
      {addresses.length === 0 ? (
        <span>{""}</span>
      ) : (
        addresses.map((addr) => (
          <div key={addr._id} className={style.card}>
            <div>
              <p>{addr.name}</p>
              <p>{addr.mobile}</p>
            </div>
            <p>{addr.address}</p>
          </div>
        ))
      )}
    </div>
  );
}
