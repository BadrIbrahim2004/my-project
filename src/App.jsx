import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Contact from "./Components/Contact";
import Header from "./Components/Header";
import Why from "./Components/Why";
import Footer from "./Components/Footer";
import MoviesList from "./Components/MoviesList";
import MovieDetails from "./Components/MovieDetails";
import BookingPage from "./Components/BookingPage";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";

// Layout wrapper يتحكم في ظهور Navbar
function Layout({ children, setSearchTerm, movies }) {
  const location = useLocation();
  const hideNavPaths = ["/login", "/signup"];
  const showNav = !hideNavPaths.includes(location.pathname);

  return (
    <>
      {showNav && <Nav setSearchTerm={setSearchTerm} movies={movies} />}
      {children}
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  // جلب الأفلام من API
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=12f95b4d46c36a2f74e0cd6ad0a44cc3&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, 16)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout setSearchTerm={setSearchTerm} movies={movies}>
              <Header />
              <MoviesList searchTerm={searchTerm} movies={movies} />
              <Why />
              <Contact />
              <Footer />
            </Layout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <Layout setSearchTerm={setSearchTerm} movies={movies}>
              <Profile />
            </Layout>
          }
        />

        <Route path="/movie/:id" element={
          <Layout setSearchTerm={setSearchTerm} movies={movies}>
            <MovieDetails />
          </Layout>
        } />

        <Route path="/booking/:id" element={
          <Layout setSearchTerm={setSearchTerm} movies={movies}>
            <BookingPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
