import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./stock.module.css";
import StockHead from "./StockHead/StockHead";
import Image from "./StockImage/Image";
import Details from "./StockDetails/Details";

export default function Stock() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={style.stock}>
      <div className={style.stockContainer}>
        <StockHead product={product} />
        <div className={style.stockBody}>
          <div className={style.card}>
            <Image product={product} />
          </div>
          <div className={style.body}>
            <Details product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
