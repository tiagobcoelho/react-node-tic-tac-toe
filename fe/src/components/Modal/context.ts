import React from 'react';
import { ModalProps } from '.';

export type ModalContextProps = {
  addModal: (props: ModalProps) => void,
  removeModal: () => void
}

export const modalContextDefault = {
  addModal: () => {
    return
  },
  removeModal: () => {
    return
  }
}

export const ModalContext = React.createContext<ModalContextProps>(
  modalContextDefault
);