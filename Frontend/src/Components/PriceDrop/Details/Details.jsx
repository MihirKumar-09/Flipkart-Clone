import style from "./Details.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Details({ product }) {
  const navigate = useNavigate();

  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetAlert = async () => {
    if (!targetPrice || !email) {
      alert("All fields are required");
      return;
    }

    if (Number(targetPrice) <= 0) {
      alert("Enter valid target price");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/alerts/price`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product._id,
            targetPrice: Number(targetPrice),
            email: email.trim(),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        setLoading(false);
        return;
      }
      toast.success("Alert set successfully !");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className={style.detailsContainer}>
        <h3>{product.name}</h3>

        <p className={style.price}>
          Current Price : ₹{product.price.toLocaleString("en-IN")}
        </p>

        <div className={style.setprice}>
          <p>Target Price:</p>
          <input
            type="number"
            placeholder="Enter target price"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
          />
        </div>

        <div className={style.setprice}>
          <p>Email:</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className={style.button}>
        <button onClick={() => navigate(`/product/${product._id}`)}>
          Cancel
        </button>

        <button onClick={handleSetAlert} disabled={loading}>
          {loading ? "Setting..." : "Set Alert"}
        </button>
      </div>
    </>
  );
}
