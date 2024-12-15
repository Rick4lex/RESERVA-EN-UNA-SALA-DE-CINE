import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Footer from './components/Footer';
import Header from './components/Header';
import MovieList from "./components/MovieList";
import MoviePage from "./components/MoviePage";




const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
      </main>
      
      <Footer />
      {/* Integración de Speed Insights */}
      <SpeedInsights />
    </div>
    </Router>
  );
};

export default App;
