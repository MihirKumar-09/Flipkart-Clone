import { useState } from "react";
import ThumbnailList from "./ThumbnailList";
import ProductImage from "./ProductImages";

export default function ProductImageContainer({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        marginTop: "70px",
      }}
    >
      <ThumbnailList setSelectedImage={setSelectedImage} product={product} />
      <ProductImage selectedImage={selectedImage} product={product} />
    </div>
  );
}
