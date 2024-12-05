import React, { useState } from 'react';
import { supabase } from '../ServerBackend/supabase';

const Modal = ({ formType, closeModal }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (formType === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
    }
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={closeModal}>&times;</span>
        <h2>{formType === 'login' ? 'Iniciar Sesión' : 'Registro'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <button type="submit">{formType === 'login' ? 'Entrar' : 'Registrarse'}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;