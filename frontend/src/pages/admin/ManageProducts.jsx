import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Loader } from "../../components/Loader";
import * as productApi from "../../api/productApi";
import toast from "react-hot-toast";
import "./AdminPages.css";

const ManageProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAllProducts({ limit: 1000 });
      setProducts(response.products);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.image ||
      !formData.stock
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await productApi.updateProduct(editingId, {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
        toast.success("Product updated successfully");
      } else {
        await productApi.createProduct({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
        toast.success("Product created successfully");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productApi.deleteProduct(id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="manage-products">
      <div className="header">
        <h1>Manage Products</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (editingId) handleCancel();
          }}
          className="add-btn"
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                  <option value="books">Books</option>
                </select>
              </div>
              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? "Update Product" : "Create Product"}
              </button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table">
        <div className="table-header">
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Stock</div>
          <div>Actions</div>
        </div>
        {products.map((product) => (
          <div key={product._id} className="table-row">
            <div className="product-name">{product.name}</div>
            <div>{product.category}</div>
            <div>₹{product.price}</div>
            <div>{product.stock}</div>
            <div className="actions">
              <button
                onClick={() => handleEdit(product)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ManageProducts = () => {
  return (
    <ProtectedRoute requireAdmin>
      <ManageProductsContent />
    </ProtectedRoute>
  );
};
