import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav({ setSearchTerm, movies }) {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [inputWidth, setInputWidth] = useState(
    window.innerWidth < 992 ? 200 : 500
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser && loggedIn === "true") setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setInputWidth(window.innerWidth < 992 ? 200 : 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = movies
        .filter((movie) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 20);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (title) => {
    setInput(title);
    setSearchTerm(title);
    setSuggestions([]);
    const movie = movies.find((m) => m.title === title);
    if (movie) navigate(`/movie/${movie.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    navigate("/login");
  };

  // اختفاء الـ Nav في login و signup
  if (location.pathname === "/login" || location.pathname === "/signup")
    return null;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark w-100"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
      }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link
          to="/"
          className="d-flex justify-content-start align-items-center">
          <img
            src="/Dream_Cinema_Logo_with_Metallic_Accents-removebg-preview.png"
            style={{ width: "80px", height: "auto" }}
            alt="Dream Cinema Logo"
          />
        </Link>

        {/* Mobile auth buttons / username + hamburger */}
        <div className="d-flex align-items-center ms-auto d-lg-none">
          {user ? (
            <div className="dropdown me-2">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="mobileUserMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  background: "crimson",
                  color: "#fff",
                  fontWeight: "bold",
                }}>
                Hi, {user.name}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="mobileUserMenu">
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
                style={{
                  background: "crimson",
                  color: "#fff",
                  fontWeight: "bold",
                }}>
                Login
              </Link>
              <Link
                className="btn me-2"
                to="/signup"
                style={{
                  background: "royalblue",
                  color: "#fff",
                  fontWeight: "bold",
                }}>
                SignUp
              </Link>
            </>
          )}

          {/* Mobile toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

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
            className="d-flex align-items-center flex-row gap-2 mt-2 mt-lg-0 position-relative"
            role="search"
            onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={input}
              onChange={handleChange}
              style={{ minWidth: `${inputWidth}px` }}
            />
            {suggestions.length > 0 && (
              <ul
                className="list-group position-absolute"
                style={{ top: "100%", zIndex: 1000, width: "100%" }}>
                {suggestions.map((movie, idx) => (
                  <li
                    key={idx}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(movie.title)}>
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="btn btn-outline-light d-flex align-items-center"
              type="submit">
              <i className="bi bi-search me-1"></i> Search
            </button>
          </form>

          {/* Desktop auth buttons / dropdown */}
          <div className="ms-auto d-none d-lg-flex align-items-center">
            {user ? (
              <div className="dropdown me-2">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    background: "crimson",
                    color: "#fff",
                    fontWeight: "bold",
                  }}>
                  Hi, {user.name}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userMenu">
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
                  style={{
                    background: "crimson",
                    color: "#fff",
                    fontWeight: "bold",
                  }}>
                  Login
                </Link>
                <Link
                  className="btn me-2"
                  to="/signup"
                  style={{
                    background: "royalblue",
                    color: "#fff",
                    fontWeight: "bold",
                  }}>
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
