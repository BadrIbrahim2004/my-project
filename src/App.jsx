import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState } from "react";
import './App.css'
import Contact from './Components/Contact'
import Header from './Components/Header'
import Why from './Components/Why'
import Footer from './Components/Footer'
import MoviesList from './Components/MoviesList'
import MovieDetails from './Components/MovieDetails'
import BookingPage from './Components/BookingPage'
import Nav from './Components/Nav'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';




function App() {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        

        <Route
          path="/"
          element={
            <>
            {/* <Nav /> */}
            <Nav setSearchTerm={setSearchTerm} />
            <Header />
      <MoviesList searchTerm={searchTerm} />

              
              {/* <MoviesList /> */}
              <Why />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/booking/:id" element={<BookingPage />} />

      </Routes>
    </Router>
  )
}

export default App
