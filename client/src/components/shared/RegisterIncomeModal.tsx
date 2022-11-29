import { useEffect, useState } from 'react';
import { Box, TextField, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormError } from './FormError';
import { MakeRequest } from '../../helpers/services/apiService';

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TNewAccount = {
  name: string;
  balance: number;
  number: string;
  bank: string;
};

export default function RegisterExpenseModal({ open, setOpen }: props) {
  console.log('register account modal rendered');
  const [categoryId, setCategoryId] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState({});

  // const handleOpen = () => setModalOpen(true);
  const handleClose = () => setOpen(false);
  const handleRegister = async (): Promise<void> => {
    const newExpense = {
      user_id: '62e4e6c22f17311b521afa71',
      account_id: '62e4e6c22f17311b521afa71',
      category_id: categoryId,
      reason: reason,
      amount: amount,
      description: description,
    };
    console.log(newExpense);
    try {
      const registered = await MakeRequest({
        url: 'expense',
        method: 'post',
        data: newExpense,
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
          <Typography variant="h5">Register New Expense</Typography>
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
            onChange={(e) => setReason(e.target.value)}
            required
            id="account_name"
            label="Account Name"
          />
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => {
              let amount: number = Number(e.target.value);
              return setAmount(amount);
            }}
            required
            id="account_balance"
            label="Initial Balance"
            type="number"
          />
          {/* <CategoryLookup
            set={setCategoryId}
            url="category"
            label="Category"
            filter="income"
            labelFromLookup="category"
          /> */}
          <TextField
            sx={{ marginBottom: '1rem' }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="account_Description"
            label="Description"
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
