import React from "react";
import { Link } from "react-router-dom";
import "./MoviesList.css";

const MoviesList = ({ searchTerm, movies }) => {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2 id="Films">Our Movies</h2>
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} id={`movie-${movie.id}`} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <Link to={`/movie/${movie.id}`} className="details-btn">
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found</p>
        )}
      </div>
    </>
  );
};

export default MoviesList;
