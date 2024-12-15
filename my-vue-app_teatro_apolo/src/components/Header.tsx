/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {Modal} from './AuthModal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import supabase from "../ServerBackend/Supabase";



const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };


  // Funciones para abrir y cerrar el modal
  const openLogin = () => {
    setFormType('login');
    setShowModal(true);
  };

  const openRegister = () => {
    setFormType('register');
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <header className="header">
      <div className="logo"><img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1732319895/logo_fg1auz.png"></img> </div>
      <h1>Teatro Apolo</h1>
      <nav>
        <ul>
          {/* agregar enlaces de navegación */}
        </ul>
      </nav>
      <input className="search" type="" placeholder="search" />
      <ul>
        {!user ? (
          <>
            <button className="login-btn" onClick={openLogin}>
              Iniciar Sesión
            </button>
            <button className="register-btn" onClick={openRegister}>
              Registro
            </button>
          </>
        ) : (
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </ul>
      </header>
    {/* Modal para Login/Registro */}
      {showModal && (
        <Modal onClose={closeModal}>
          {formType === 'login' ? (
            <>
              <h2></h2>
              <LoginForm onClose={closeModal} />
              <button
                className="switch-form-btn"
                onClick={() => setFormType('register')}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </>
          ) : (
            <>
              <h2></h2>
              <RegisterForm onClose={closeModal} />
              <button
                className="switch-form-btn"
                onClick={() => setFormType('login')}
              >
                ¿Ya tienes cuenta? Inicia Sesión
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Header;