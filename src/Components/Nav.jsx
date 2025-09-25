import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav({ setSearchTerm }) {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedIn) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // تمسح بيانات اليوزر كمان
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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5 ps-2">
            <li className="nav-item">
              <a className="nav-link active px-3 ms-5" href="#">
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
              <a className="nav-link px-2" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#social">
                Social
              </a>
            </li>
          </ul>

          {/* Search + Auth */}
          <div className="d-flex align-items-center flex-row gap-2 mt-2 mt-lg-0">
            {/* Search */}
            <form
              className="d-flex align-items-center flex-row gap-2"
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

            {/* Auth dropdown or buttons */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
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
                <Link className="btn btn-outline-light" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-light" to="/signup">
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
