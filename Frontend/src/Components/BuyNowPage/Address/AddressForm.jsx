import style from "./AddressForm.module.css";
import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";

export default function AddressForm({ onCancel, onSave }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const { error, setError } = useAuth();

  const indianStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman & Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleSubmit = async () => {
    if (!name || !mobile || !pincode || !address || !city || !state) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          mobile,
          pincode,
          address,
          city,
          state,
        }),
      });

      const data = await res.json();
      console.log("Saved:", data);

      if (data.success) {
        onSave(); // close the form
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.addressForm}>
      <h5>ADD A NEW ADDRESS</h5>

      <div className={style.twoFiled}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="10-digit mobile number"
          value={mobile}
          onChange={(e) => {
            const value = e.target.value;

            // allow only digits AND max 10 characters
            if (/^\d{0,10}$/.test(value)) {
              setMobile(value);
            }
          }}
        />
      </div>

      <div className={style.twoFiled}>
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Locality"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Address (Area and Street)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className={style.twoFiled}>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select State</option>
          {indianStates.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={style.error}>{error}</p>}

      <div className={style.btns}>
        <button onClick={handleSubmit}>SAVE AND DELIVER HERE</button>
        <button onClick={onCancel} className={style.cancelBtn}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
