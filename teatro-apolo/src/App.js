import './styles/App.css';
import {useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import {supabase} from "./ServerBackend/supabase"

import Home from './pages/home';

function App() {
  const Navigate = useNavigate();

  useEffect (() => {

    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        Navigate('./components/MovieList.js')
      } else{
        Navigate('/')
      }
    })

  }, [])

  return (
    <div className="App">
    
      <Header /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<NotFound/>} />
        
      </Routes>

      
      <Footer />
    </div>
  );
}

export default App;
