import { useContext } from 'react';
import { ModalContext, ModalContextProps } from './context';

export const useModal = (): ModalContextProps => useContext(ModalContext);