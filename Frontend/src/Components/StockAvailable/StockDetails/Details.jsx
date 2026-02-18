import style from "./Details.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";

export default function Details({ product }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [autoBuy, setAutoBuy] = useState(false);

  const handleAlert = async () => {
    if (!user) {
      toast.error("Please login to set alert");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          email,
          type: "stock",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          "Alert created successfully! You will be notified when back in stock.",
        );
      } else {
        toast.error(data.message || "Failed to create alert");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while creating the alert");
    }
  };

  return (
    <div className={style.detailsContainer}>
      <p className={style.notify}>Notify me when this item is back in stock</p>
      <div className={style.inputContainer}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={style.autoBuy}>
        <label className={style.checkContainer}>
          <input
            type="checkbox"
            checked={autoBuy}
            onChange={(e) => setAutoBuy(e.target.checked)}
          />
          <span className={style.checkmark}></span>
          <p>Auto-Buy when back in stock</p>
        </label>
      </div>
      <div className={style.buttonContainer}>
        <button onClick={handleAlert}>Set Alert</button>
        <button onClick={() => navigate(`/product/${product._id}`)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
