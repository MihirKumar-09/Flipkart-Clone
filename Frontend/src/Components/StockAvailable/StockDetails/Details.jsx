import style from "./Details.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Details({ product }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAlert = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

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
        toast.success("You will be notified when back in stock.");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to create alert");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.detailsContainer}>
      <p className={style.notify}>
        Enter your email to get notified when this item is back in stock
      </p>

      <div className={style.inputContainer}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={style.buttonContainer}>
        <button onClick={handleAlert} disabled={loading}>
          {loading ? "Setting..." : "Set Alert"}
        </button>

        <button onClick={() => navigate(`/product/${product._id}`)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
