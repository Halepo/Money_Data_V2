import { useEffect, useState } from 'react';
import { Box, TextField, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { MakeRequest } from '../../../../helpers/services/apiService';
import { FormError } from '../../../shared/FormError';

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

type TNewAccount = {
  user_id: string;
  name: string;
  balance: number;
  number: string;
  bank: string;
};

export default function RegisterAccountModal({ open, setOpen, userId }: props) {
  console.log('register account modal rendered');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState('');
  const [description, setDescription] = useState('');

  // const handleOpen = () => setModalOpen(true);
  const handleClose = () => setOpen(false);
  const handleRegister = async (): Promise<void> => {
    const newAccount = {
      user_id: userId,
      account_balance: balance,
      bank: bank,
      account_number: number,
      account_name: name,
      account_description: description,
    };
    console.log(newAccount);
    try {
      const registered = await MakeRequest({
        url: 'account',
        method: 'post',
        data: newAccount,
        needAuthorization: true,
      });
      console.log(registered, 'registered');
      setOpen(false);
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        setError(errorData);
        return;
      }
    }
  };

  return (
    <Modal
      sx={{ minWidth: 'lg' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '0px solid #000',
          borderRadius: '.4rem',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Register New Account</Typography>
          <Divider
            sx={{
              width: '80%',
              height: '.1rem',
              backgroundColor: 'gray',
              marginBottom: '2rem',
            }}
          />
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => setName(e.target.value)}
            required
            id="account_name"
            label="Account Name"
          />
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => {
              let accountBalance: number = Number(e.target.value);
              return setBalance(accountBalance);
            }}
            required
            id="account_balance"
            label="Initial Balance"
            type="number"
          />
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => {
              let description: string = e.target.value;
              return setDescription(description);
            }}
            id="account_Description"
            label="Description"
          />
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => setNumber(e.target.value)}
            id="account_number"
            label="Account Number"
            required
          />
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => setBank(e.target.value)}
            id="bank"
            label="Bank"
            required
          />
          {Object.keys(error).length > 0 ? <FormError error={error} /> : ''}
        </Box>
        <Button color="success" variant="outlined" onClick={handleRegister}>
          Register
        </Button>
        <Button color="error" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}
