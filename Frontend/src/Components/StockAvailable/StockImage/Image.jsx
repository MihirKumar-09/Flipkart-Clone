import style from "./Image.module.css";

export default function Image({ product }) {
  const imageUrl = product.image?.[0]?.url;

  return (
    <div className={style.imageContainer}>
      {imageUrl ? (
        <img src={imageUrl} alt={product.name} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}
