import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
export default function AudioWave() {
  const boxesRef = useRef([]);
  let [showProducts, setShowProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchPorducts = async () => {
      try {
        let res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Nackbands,Earbuds,SoundSpeaker,Headphones&limit=10&random=true`,
        );
        let data = await res.json(res);
        setShowProducts(data);
      } catch (err) {
        console.log("Faild to fetch today deals");
      }
    };
    fetchPorducts();
  }, []);

  useEffect(() => {
    if (!boxesRef.current.length) return;

    boxesRef.current.forEach((box) => {
      if (!box) return;
      gsap.fromTo(
        box,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    ScrollTrigger.refresh(); // ensure proper trigger positions
  }, [showProducts]);

  // handle audio wave
  const handleAudioWave = () => {
    navigate("/product-list?search=Nackbands|Earbuds|SoundSpeaker|Headphones");
  };

  boxesRef.current = [];
  return (
    <div className="today-deals">
      <div className="today-deals-head">
        <h1>Audio Wave</h1>
        <i
          className="fa-solid fa-circle-chevron-right"
          onClick={() => handleAudioWave()}
        ></i>
      </div>
      <hr style={{ margin: "0px" }} />

      <div className="today-items">
        {showProducts.length > 0 ? (
          showProducts.map((item, i) => (
            <Link
              to={`/product/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="today-card-link"
            >
              <div
                className="today-card"
                key={item._id}
                ref={(el) => {
                  if (el) boxesRef.current[i] = el;
                }}
              >
                <img src={item.image[0].url} alt={item.name} />
                <p className="title">{item.name}</p>
                <span>
                  <p>{item.brand}</p>
                  <p className="rating">{item.rating} &#9733;</p>
                </span>
                <p className="electronics-price">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading top deals</p>
        )}
      </div>
    </div>
  );
}
