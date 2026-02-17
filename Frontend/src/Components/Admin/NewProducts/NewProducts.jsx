import { useState } from "react";
import style from "./NewProducts.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function NewOrder() {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    highlights: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  // fetch create new product;
  const createNewProduct = async () => {
    try {
      setErrors({});
      setLoading(true);
      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }

      const res = await fetch("http://localhost:8080/api/product", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          toast.error(data.message || "Something went wrong");
        }
        return;
      }
      console.log(data);
      toast.success("Add successfully");
      navigate("/");
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.newProductContainer}>
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>
          <span>Create new</span>
          <span>
            <i class="fa-solid fa-plus"></i>
          </span>
        </button>
      ) : (
        <form
          className={style.formWrapper}
          onSubmit={(e) => {
            e.preventDefault();
            createNewProduct();
          }}
        >
          <h2 className={style.formTitle}>Add New Product</h2>

          <div className={style.newForm}>
            {/* Product Title */}
            <div className={style.formGroup}>
              <label htmlFor="title">Product Title</label>
              <input
                type="text"
                id="title"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product title"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.name}</div>
            </div>

            {/* Description + Image */}
            <div className={style.gridTwo}>
              <div className={style.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.description}</div>
              </div>

              <div className={style.formGroup}>
                <label htmlFor="image">Upload Image</label>
                <input
                  type="file"
                  id="image"
                  multiple
                  className={`form-control ${errors.images ? "is-invalid" : ""}`}
                  onChange={(e) => setSelectedImages(e.target.files)}
                />
                <div className="invalid-feedback">{errors.images}</div>
              </div>
            </div>

            {/* Price + Stock */}
            <div className={style.gridTwo}>
              <div className={style.formGroup}>
                <label htmlFor="price">Price (₹)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.price}</div>
              </div>

              <div className={style.formGroup}>
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Available stock"
                  className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.stock}</div>
              </div>
            </div>

            {/* Brand + Category */}
            <div className={style.gridTwo}>
              <div className={style.formGroup}>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  className={`form-control ${errors.brand ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.brand}</div>
              </div>

              <div className={style.formGroup}>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Enter category (Mobiles, Laptops)"
                  className={`form-control ${errors.category ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.category}</div>
              </div>
            </div>

            {/* Highlights */}
            <div className={style.formGroup}>
              <label htmlFor="highlights">Highlights</label>
              <input
                type="text"
                id="highlights"
                name="highlights"
                value={product.highlights}
                onChange={handleChange}
                placeholder="Key product highlights using comma "
                className={`form-control ${errors.highlights ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.highlights}</div>
            </div>
            <div className={style.buttonGroup}>
              <button
                type="button"
                className={style.cancelBtn}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className={style.submitBtn}>
                {loading ? "Uploading..." : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
