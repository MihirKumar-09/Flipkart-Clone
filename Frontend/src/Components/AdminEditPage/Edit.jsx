import style from "./Edit.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/${id}`,
        );
        const data = await res.json();
        setTitle(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
        setBrand(data.brand);
        setCategory(data.category);
        setHighlights(data.highlights || []);
        setImages(data.image);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add highlight
  const handleAddHighlight = () => {
    if (highlightInput.trim() && !highlights.includes(highlightInput.trim())) {
      setHighlights([...highlights, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  // Remove highlight
  const handleRemoveHighlight = (index) => {
    const newList = [...highlights];
    newList.splice(index, 1);
    setHighlights(newList);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(files);
      setImages(
        files.map((file) => ({
          url: URL.createObjectURL(file),
          filename: file.name,
        })),
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("highlights", JSON.stringify(highlights));
    newImages.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/products/update/${id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Update failed");
      }

      const data = await res.json();
      toast.success("Product Updated Successfully");
      navigate(`/product/${id}`);
      console.log("Updated product:", data.product);
    } catch (err) {
      console.error(err);
      alert(`Update failed: ${err.message}`);
    }
  };

  if (loading) return <p>Loading product data...</p>;

  return (
    <div className={style.editContainer}>
      <div className={style.editForm}>
        <h4>Edit Product</h4>
        <form onSubmit={handleUpdate}>
          <label>
            Product Name
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </label>

          <div className={style.row}>
            <span>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </span>
            <span>
              <label>Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </span>
          </div>

          <div className={style.row}>
            <span>
              <label>Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </span>
            <span>
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </span>
          </div>

          <label>
            Highlights
            <div className={style.highlightsContainer}>
              {highlights.map((h, idx) => (
                <div key={idx} className={style.highlight}>
                  {h} <span onClick={() => handleRemoveHighlight(idx)}>×</span>
                </div>
              ))}
            </div>
            <div className={style.highlightInput}>
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="Add highlight"
              />
              <button type="button" onClick={handleAddHighlight}>
                Add
              </button>
            </div>
          </label>

          <label>
            Product Images
            <div className={style.imagePreview}>
              {images.map((img, idx) => (
                <img key={idx} src={img.url} alt={`Preview ${idx}`} />
              ))}
            </div>
            <input type="file" multiple onChange={handleImageChange} />
          </label>

          <div className={style.buttons}>
            <button type="button" onClick={() => navigate(`/product/${id}`)}>
              Cancel
            </button>
            <button type="submit">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
