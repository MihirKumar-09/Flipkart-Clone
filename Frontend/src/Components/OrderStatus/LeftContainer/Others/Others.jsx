import style from "./Others.module.css";
import { useState } from "react";
import { Copy, Check } from "lucide-react"; // Library for icons;
import { toast } from "react-toastify";
export default function Others({ order }) {
  const [copied, setCopied] = useState(false);

  const notify = () => {
    toast.warn("Copied to clipboard", {
      theme: "dark",
      position: "bottom-center",
      iconTheme: {
        primary: "#22c55e",
        secondary: "#000000",
      },
    });
  };

  const handelCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      notify();
    } catch (err) {
      console.error("Copied Failed", err);
    }
  };
  return (
    <div className={style.otherDetails}>
      <p>
        Order #{order.orderId}
        <button
          onClick={handelCopy}
          className={style.copyBtn}
          aria-label="Copy Order Id"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </p>
    </div>
  );
}
