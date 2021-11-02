import React, { useState, useEffect } from 'react';

// Context import
import { ModalContext, ModalContextProps } from './context'

// Component import
import Button from '../Button';

// Component Props type
export type ModalProps = {
  message?: string,
  isFlash?: boolean,
  restart?: () => void,
  rematch?: () => void,
};

const Modal: React.FC<ModalProps> = ({ children}) => {

  const [modal, setModal] = useState<ModalProps | null>(null);

  const addModal: ModalContextProps["addModal"] = (props) => {
    setModal(props);
  }
  
  const removeModal: ModalContextProps["removeModal"] = () => {
    setModal(null);
  }

  useEffect(() => {
    if(modal?.isFlash) setTimeout(removeModal, 1000);
  }, [modal]);
  
  const handleRestart = () => {
    if(!modal?.restart) return;
    removeModal();
    modal.restart();
  };
  
  const handleRematch = () => {
    if(!modal?.rematch) return;
    removeModal();
    modal?.rematch();
  }

  return (
    <ModalContext.Provider
      value={{
        addModal,
        removeModal,
      }}
    >
      {children}
      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-message">{modal.message}</p>
            {!modal.isFlash && (
              <div className="modal-actions">
                <Button skin="secondary" onClick={() => handleRestart()}>
                  New Players
                </Button>
                <Button skin="primary" onClick={() => handleRematch()}>
                  New Game
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default Modal;
