import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    
    const handleClickEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleClickEsc);

    return () => window.removeEventListener('keydown', handleClickEsc);
  }, [onClose]);

  
  const handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleClickBackdrop}>
      <ModalDiv>{children}</ModalDiv>
    </Overlay>,
    modalRoot
  );
};