 
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../ServerBackend/Supabase";
import YouTube from "react-youtube";
import "../App.css";

interface Seat {
  row: string;
  col: number;
  status: "available" | "occupied" | "unavailable" | "selected";
}

interface Movie {
  title: string;
  director: string;
  genre: string;
  imgSrc: string;
  youtubeId: string;
}


const MoviePage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [seats, setSeats] = useState<Seat[][]>([]);
  const [youtubeId, setYoutubeId] = useState<string>(""); // Ejemplo

  // Generar última semana
  const lastWeekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  // Horarios de ejemplo
  const rooms = [
    { id: "Sala 1", format: "2D", times: ["14:00", "16:00", "20:00"] },
    { id: "Sala 2", format: "3D", times: ["13:00", "18:00"] },
    { id: "Sala 3", format: "4D", times: ["12:00", "15:30"] },
  ];

  // Cargar info de película
  useEffect(() => {
    const fetchMovie = async () => {
      const { data, error } = await supabase.from("movies").select("title, director, genre, imgSrc, youtubeId").eq("id", id).single();
       if (error) {
        console.error("Error al cargar la película:", error.message);
        return;
      }

      setMovie(data);
      setYoutubeId(data.youtubeId || "");
    };

  initializeSeats();
  fetchMovie();
}, [id]);

  // Generar sillas
  const initializeSeats = () => {
  const seatGrid: Seat[][] = [];
  const rows = ["A", "B", "C", "D"];
  for (const row of rows) {
    const rowSeats: Seat[] = Array.from({ length: 7 }, (_, i) => ({
      row,          // Fila
      col: i + 1,   // Numero de columna
      status: Math.random() < 0.1 ? "occupied" : "available", // Solo valores válidos
    }));
    seatGrid.push(rowSeats);
  }
  setSeats(seatGrid);
};


  const handleSeatClick = (row: string, col: number) => {
  const seatId = `${row}${col}`;
  setSelectedSeats((prev) =>
    prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
  );
};


  const handleStepChange = (nextStep: number) => {
    setStep(nextStep);
  };

  return movie ? (
    <div className="movie-container">
    
    <div className="movie-reservation">
      {/* Encabezado */}
      <div className="movie-header">
        <img src={movie.imgSrc} alt={movie.title} />
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <p>Director: {movie.director}</p>
          <p>Género: {movie.genre}</p>
        </div>
        {/* YouTube Video */}
          <div className="trailer-section">
            <h2>Trailer</h2>
            {youtubeId ? (
              <YouTube videoId={youtubeId} opts={{ width: "100%" }} />
            ) : (
              <p>No hay tráiler disponible.</p>
            )}
          </div>
      </div>
      </div>
      {/* Step Progress */}
      <div className="step-indicator">
        <div className={`step ${step >= 1 ? "active" : ""}`}>1. Fecha y Sala</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>2. Selección de Sillas</div>
        <div className={`step ${step === 3 ? "active" : ""}`}>3. Confirmación</div>
      </div>

      {/* Step 1: Fecha y Sala */}
      {step === 1 && (
        <div className="step-one">
          <h2>Selecciona la Fecha</h2>
          <div className="date-selector">
            {lastWeekDays.map((day) => (
              <button
                key={day}
                className={`date-btn ${selectedDate === day ? "selected" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <h2>Selecciona la Sala</h2>
          <div className="room-cards">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`room-card ${
                  selectedRoom === room.id ? "selected" : ""
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <h3>{room.id} - {room.format}</h3>
                <p>Horarios:</p>
                {room.times.map((time) => (
                  <span key={time} className="room-time">{time}</span>
                ))}
              </div>
            ))}
          </div>
          <button onClick={() => handleStepChange(2)} disabled={!selectedDate || !selectedRoom}>
            Continuar
          </button>
        </div>
      )}

      {/* Step 2: Selección de Sillas */}
      {step === 2 && (
        <div className="step-two">
          <h2>Selecciona tus Sillas</h2>
          <div className="seat-map">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {row.map((seat) => (
                  <div
                    key={seat.col}
                    className={`seat ${seat.status} ${
                      selectedSeats.includes(`${seat.row}${seat.col}`)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      seat.status === "available" &&
                      handleSeatClick(seat.row, seat.col)
                    }
                  >
                    {seat.col}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={() => handleStepChange(3)}>Continuar</button>
        </div>
      )}

      {/* Step 3: Informe de Reserva */}
      {step === 3 && (
        <div className="step-three">
          <h2>Confirmación de Reserva</h2>
          <p>
            Fecha: {selectedDate}, Sala: {selectedRoom}
          </p>
          <p>Sillas: {selectedSeats.join(", ")}</p>
        </div>
      )}

      
    </div>
  ) : (
  <p>Estamos cargando la información de la película...</p>
  );
};

export default MoviePage;
