import { createContext, useContext, useEffect, useState } from "react";
const BuyNowContext = createContext();
export default function BuyNowProvider({ children }) {
  const [buyNowItem, setBuyNowItem] = useState(() => {
    const stored = localStorage.getItem("buyNowItem");
    return stored ? JSON.parse(stored) : null;
  });

  const setBuyNow = (item) => {
    setBuyNowItem(item);
  };

  useEffect(() => {
    if (buyNowItem) {
      localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
    } else {
      localStorage.removeItem("buyNowItem");
    }
  });
  const getTotal = () => {
    if (!buyNowItem) return 0;
    return buyNowItem.price * (buyNowItem.quantity || 1);
  };

  return (
    <BuyNowContext.Provider value={{ buyNowItem, setBuyNow, getTotal }}>
      {children}
    </BuyNowContext.Provider>
  );
}

export const useBuyNow = () => useContext(BuyNowContext);
