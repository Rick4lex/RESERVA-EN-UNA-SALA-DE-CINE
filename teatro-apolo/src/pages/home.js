import React from 'react';
import Header from '../components/header';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <MovieList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;