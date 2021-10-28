import React, { useState, useEffect } from 'react';
import { ModalContext, ModalContextProps } from './context'

export type ModalProps = {
  message?: string,
  isFlash?: boolean
  restart?: () => void,
  rematch?: () => void,
}

const Modal: React.FC<ModalProps> = ({ children}) => {

  const [modal, setModal] = useState<ModalProps | null>(null)

  const addModal: ModalContextProps["addModal"] = (props) => {
    console.log(props)
    setModal(props)
  }
  
  const removeModal: ModalContextProps["removeModal"] = () => {
    setModal(null)
  }

  useEffect(() => {
    console.log(modal)
   })
  useEffect(() => {
    if(modal?.isFlash) setTimeout(removeModal, 3000)
  }, [modal])
  // if(!modal) return <>{children}</>
  
  const handleRestart = () => {
    if(!modal?.restart) return
    removeModal()
    modal.restart()
  }
  
  const handleRematch = () => {
    console.log(modal?.rematch)
    if(!modal?.rematch) return
    removeModal()
    modal?.rematch()
  }

  return (
    <ModalContext.Provider
      value={{
        addModal,
        removeModal
      }}
    >
      {children}
      {modal && (
        <div>
          <p>{modal.message}</p>
          {!modal.isFlash && (
            <>
              <button onClick={() => handleRestart()}>back to begining</button>
              <button onClick={() => handleRematch()}>rematch</button>
            </>
          )}
        </div>

      )}
    </ModalContext.Provider>
  )
}

export default Modal;
