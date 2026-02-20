import style from "./SimilarProduct.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SimilarProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch main product
  useEffect(() => {
    if (!id) return;
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Fetch similar products
  useEffect(() => {
    if (!product) return;
    const fetchSimilar = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/products/category/${product.category}`,
        );
        let data = await res.json();
        data = data.filter((p) => p._id !== product._id);
        setSimilarProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSimilar();
  }, [product]);

  // Handle Similar product list;
  const handleSimilarProduct = () => {
    navigate(`/product-list?search=${product.category}`);
  };

  if (!product) return <p>Loading product...</p>;
  return (
    <div className={style.container}>
      <div className={style.head}>
        <h2 className={style.title}>Similar Products</h2>
        <i
          className="fa-solid fa-circle-chevron-right"
          onClick={() => handleSimilarProduct()}
        ></i>
      </div>

      <div className={style.grid}>
        {similarProducts.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className={style.cardLink}
          >
            <div className={style.card}>
              <div className={style.imageBox}>
                <img src={item.image?.[0]?.url} alt={item.name} />
              </div>
              <div className={style.details}>
                <h3 className={style.name}>{item.name}</h3>
                <span>
                  <p>&#8377; {item.price.toLocaleString("en-IN")}</p>
                  <p>{item.rating} &#9733;</p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
