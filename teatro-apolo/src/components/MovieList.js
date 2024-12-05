import React, { useState, useEffect } from 'react';
import { supabase } from '../ServerBackend/supabase';
import '../styles/index.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data, error } = await supabase.from('Peliculas').select('*');
    if (error) console.error('Error fetching movies:', error);
    else setMovies(data);
  };

  const filteredMovies = movies.filter(movie => {
    if (filter === 'all') return true;
    // Lógica de filtro por fecha
    return movie.release_date === 'today';  // Ejemplo simplificado
  });

  return (
    <section className="movies-section">
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>Todas las películas</button>
        <button onClick={() => setFilter('today')}>Hoy</button>
        <button onClick={() => setFilter('upcoming')}>Próximamente</button>
      </div>
      <div className="movies-list">
        {filteredMovies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.image_url} alt={movie.title} />
            <h5>{movie.title}</h5>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Género:</strong> {movie.genre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MovieList;