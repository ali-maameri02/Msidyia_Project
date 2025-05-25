import React from 'react';
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CloseOutlined } from '@mui/icons-material';
import logom from '../../assets/msidiya-m-logo.png'; // Assuming this path is correct
import wallet3d from '../../assets/3d-icon-wallet-with-pockets-money-cards.png'; // Assuming this path is correct

interface NavbarWalletProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  user: any; // You might want to define a more specific type for 'user'
}

const NavbarWallet: React.FC<NavbarWalletProps> = ({ open, handleOpen, handleClose, user }) => {
  return (
    <>
      {user ? (
        <Button onClick={handleOpen} className="border-black border-solid flex flex-row items-center p-1 h-8 shadow-gray-400 shadow-sm bg-gray-200 rounded-md">
          <img src={logom} className="border-solid border-black" width={20} style={{ height: '1rem' }} alt="" />
        </Button>
      ) : (
        <div className="none hidden"></div>
      )}

      <Modal
        open={open}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="relative bg-white p-5 pt-2 rounded-lg shadow-lg" style={{ width: "60vw" }}>
          <div className="iconsdiv w-full flex justify-end items-start">
            <Button className="iconclose" onClick={handleClose}><CloseOutlined className="text-color" /></Button>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Typography id="modal-modal-title" className="flex flex-row items-center" variant="h6" component="h2">
              No Wallet Exists <CloseOutlined className="text-red-500" />
            </Typography>
            <img src={wallet3d} width={200} alt="3D Wallet Icon" />
          </div>
          <Button variant="contained">Add a MS_Wallet</Button>
        </Box>
      </Modal>
    </>
  );
};

export default NavbarWallet;
