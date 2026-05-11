import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

export const Navbar = () => {
  const { user, isAdmin, logout, isAuthenticated } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search redirect - will be implemented in HomePage
    window.location.href = `/?search=${searchQuery}`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🛍️ E-Commerce
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {/* Right side menu */}
        <div className="navbar-right">
          {/* Cart Icon */}
          <Link to="/cart" className="cart-icon">
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Admin Link */}
          {isAdmin && (
            <Link to="/admin" className="admin-link">
              📊 Admin
            </Link>
          )}

          {/* Auth Links */}
          <div className="auth-menu">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="nav-link">
                  {user?.name}
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="menu-toggle"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div className="mobile-menu">
          <Link to="/cart" onClick={() => setShowMenu(false)}>
            Cart
          </Link>
          {isAdmin && (
            <Link to="/admin" onClick={() => setShowMenu(false)}>
              Admin Dashboard
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setShowMenu(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setShowMenu(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setShowMenu(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-btn-mobile">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
