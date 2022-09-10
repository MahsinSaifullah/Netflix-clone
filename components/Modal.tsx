import * as React from 'react';
import MUIModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms';

export const Modal: React.FC = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);

  const handleOnClose = () => {
    setShowModal(false);
  };

  return (
    <MUIModal open={showModal} onClose={handleOnClose}>
      <>Modal</>
    </MUIModal>
  );
};
