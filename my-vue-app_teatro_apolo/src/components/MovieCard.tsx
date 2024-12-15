import React from 'react';
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number; 
  imgSrc: string;
  title: string;
  director: string;
  genre: string;
  youtubeId: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, imgSrc, title, director, genre, }) => {
  return (
    <div className="movie-card">
      <img src={imgSrc} alt="Movie" />
      <h5>{title}</h5>
      <p>
        <strong>Director:</strong> {director}
      </p>
      <p>
        <strong>Género:</strong> {genre}
      </p>
      <button className='ficha-btn'>
        <Link to={`/movie/${id}`}>Ver ficha</Link>
      </button>
    </div>
  );
};

export default MovieCard;