import React, { useState } from 'react';
import Modal from './modal';
import '../styles/index.css';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState('login');

  const openModal = (type) => {
    setFormType(type);
    setModalOpen(true);
  };

  return (
    <header>
      <div className="logo">
        <img src="https://res.cloudinary.com/dyeppbrfl/image/upload/v1732319895/logo_fg1auz.png" alt="Logo Teatro Apolo" />
      </div>
      <nav>
        <ul>
          <li><a href='#Home'>Home</a></li>
          <li>Quienes Somos</li>
          <li>Servicios</li>
          <li>Contacto</li>
        </ul>
      </nav>
      <div className="header-buttons">
        <button onClick={() => openModal('login')}>Login</button>
        <button onClick={() => openModal('register')}>Registro</button>
      </div>
      {isModalOpen && <Modal formType={formType} closeModal={() => setModalOpen(false)} />}
    </header>
  );
}

export default Header;