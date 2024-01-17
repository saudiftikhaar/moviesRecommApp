  
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  

function App() {
  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '20f83df4badbb59437e4c78af7ca93cb';  

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`);
      setMovies(response.data.results);
      setError(null);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setMovies([]);
      setError('Error fetching movie data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Movie Recommendation App</h1>
      <div className="mb-3">
        <label htmlFor="genre">Select a genre:</label>
        <select
          id="genre"
          className="form-control"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
        </select>
        <button
          className="btn btn-primary mt-2"
          onClick={fetchMovies}
          disabled={loading || !genre}
        >
          {loading ? 'Fetching...' : 'Get Recommendations'}
        </button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {movies.length > 0 && (
        <div>
          <h2>Recommended Movies:</h2>
          <ul className="list-group">
            {movies.map(movie => (
              <li key={movie.id} className="list-group-item">
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
