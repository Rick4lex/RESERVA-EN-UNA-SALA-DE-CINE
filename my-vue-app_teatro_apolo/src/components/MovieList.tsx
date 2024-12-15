import MovieCard from '../components/MovieCard.tsx';
import supabase from  '../ServerBackend/Supabase.ts';
import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  imgSrc: string;
  link: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Estado para almacenar películas

  // Función para obtener películas de Supabase
  const fetchMovies = async () => {
    const { data, error } = await supabase.from("movies").select("*");
    if (error) {
      console.error("Error fetching movies:", error.message);
    } else {
    console.log("Películas obtenidas:", data); // Agrega este console.log
    setMovies(data || []);
  }
};

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          imgSrc={movie.imgSrc}
          title={movie.title}
          director={movie.director}
          genre={movie.genre}
          link={movie.link} id={0}        />
      ))}
    </section>
  );
};

export default MovieList;
