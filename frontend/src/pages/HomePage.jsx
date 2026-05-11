import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { CartContext } from "../context/CartContext";
import * as productApi from "../api/productApi";
import toast from "react-hot-toast";
import "./HomePage.css";

const CATEGORIES = ["electronics", "clothing", "food", "books"];

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    page: 1,
    limit: 12,
  });
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setFilters((prev) => ({ ...prev, search, page: 1 }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAllProducts(filters);
      setProducts(response.products);
      setPagination({
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      });
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePriceFilter = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value, page: 1 }));
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="home-page">
      <div className="filters-section">
        <h3>Filters</h3>

        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price: ₹{filters.minPrice || "0"}</label>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={filters.minPrice}
            onChange={(e) => handlePriceFilter("minPrice", e.target.value)}
            className="filter-slider"
          />
        </div>

        <div className="filter-group">
          <label>Max Price: ₹{filters.maxPrice || "100000"}</label>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={filters.maxPrice}
            onChange={(e) => handlePriceFilter("maxPrice", e.target.value)}
            className="filter-slider"
          />
        </div>

        <button
          onClick={() =>
            setFilters({
              category: "",
              minPrice: "",
              maxPrice: "",
              search: "",
              page: 1,
              limit: 12,
            })
          }
          className="reset-filters-btn"
        >
          Reset Filters
        </button>
      </div>

      <div className="products-section">
        <h1>Products</h1>

        {loading ? (
          <Loader />
        ) : products.length > 0 ? (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            <div className="pagination">
              {pagination.currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className="pagination-btn"
                >
                  ← Previous
                </button>
              )}

              <span className="page-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              {pagination.currentPage < pagination.totalPages && (
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className="pagination-btn"
                >
                  Next →
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
};
