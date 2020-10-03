import { useContext } from 'react';
import { ModalContext } from '../contexts/modal';

export const useModal = () => {
  const { modal, setModal } = useContext(ModalContext)
  return{ modal, setModal }
}
