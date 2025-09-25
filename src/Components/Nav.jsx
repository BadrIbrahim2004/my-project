import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav({ setSearchTerm }) {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedIn === "true") {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed w-100 top-0 z-3">
      <div className="container-fluid">
        {/* Logo */}
        <img
          src={"/Dream_Cinema_Logo_with_Metallic_Accents-removebg-preview.png"}
          style={{ width: "80px", height: "auto", marginLeft: "40px" }}
          alt="Dream Cinema Logo"
        />

        {/* Mobile toggler */}
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navbar links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active px-3" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#Films">
                Films
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#About">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#social">
                Social
              </a>
            </li>
          </ul>

          {/* Search form */}
          <form
            className="d-flex align-items-center flex-row gap-2 mt-2 mt-lg-0"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-outline-light d-flex align-items-center"
              type="submit"
            >
              <i className="bi bi-search me-1"></i> Search
            </button>
          </form>

          {/* Auth buttons / dropdown */}
          <div className="ms-auto d-flex align-items-center">
            {user ? (
              <div className="dropdown me-2">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "crimson", color: "#fff", fontWeight: "bold" }}
                >
                  Hi, {user.name}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userMenu"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  className="btn me-2"
                  to="/login"
                  style={{ background: "crimson", color: "#fff", fontWeight: "bold" }}
                >
                  Login
                </Link>
                <Link
                  className="btn me-2"
                  to="/signup"
                  style={{ background: "royalblue", color: "#fff", fontWeight: "bold" }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
