import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode; // Contenido del modal
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cierre */}
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {/* Contenido dinámico */}
        {children}
      </div>
    </div>
  );
};
