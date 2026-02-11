import style from "./ProductImages.module.css";
import Button from "./Buttons";
import AdminButtons from "./AdminButtons/Buttons";
export default function ProductImage({ selectedImage, product }) {
  return (
    <div className={style.ProductImageContainer}>
      <div className={style.ProductImages}>
        {selectedImage ? <img src={selectedImage} alt="Selected" /> : ""}
      </div>
      <Button product={product} />
      <AdminButtons product={product} />
    </div>
  );
}
