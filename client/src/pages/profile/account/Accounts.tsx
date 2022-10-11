import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { MakeRequest } from '../../../services/apiService';
import { IAccount } from '../../../interface/account';

import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import RegisterExpenseModal from '../components/RegisterExpenseModal';
import AccountCard from './AccountCard';
import RegisterAccountModal from './RegisterAccountModal';

import { UserDetailsContext } from '../../../services/context/UserDetailsContext';

export default function Accounts() {
  //register modal
  const [registerAccountModalOpen, setRegisterAccountModalOpen] =
    useState(false);
  //register modal
  const [registerExpenseModalOpen, setRegisterExpenseModalOpen] =
    useState(false);

  const { userDetails } = useContext(UserDetailsContext);

  const [accounts, setAccounts] = useState([]);
  console.log('userDetails', userDetails);
  const fetchAccount = () => {
    if (Object.keys(userDetails).length > 0) {
      const userId = userDetails.userId;
      console.log(`Fetching accounts for userId [${userId}]`);
      const account = async (userId: string) => {
        const response: any = await MakeRequest(
          `account?user_id=${userId}`,
          'get',
          null,
          true 
        );
        console.log(response, 'res');
        if (response.length > 0) setAccounts(response);
      };
      account(userId).catch(console.error);
    } else return <Navigate to="/login" />;
  };

  useEffect(() => {
    return () => {
      fetchAccount();
    };
  }, [registerAccountModalOpen]);

  console.log(accounts, 'Accounts');

  return (
    <>
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Typography variant="h4">Accounts</Typography>
        <Button
          sx={{ marginLeft: 'auto' }}
          variant="outlined"
          startIcon={<AccountBalanceWalletIcon />}
          onClick={() => setRegisterAccountModalOpen(true)}
        >
          Create Money Account
        </Button>
        <Button
          variant="outlined"
          startIcon={<RemoveCircleOutlineIcon />}
          onClick={() => setRegisterExpenseModalOpen(true)}
          color="error"
        >
          Register Expense
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          // onClick={() => setRegisterForm('income')}
          color="success"
        >
          Register Income
        </Button>
      </Box>
      <Box
        sx={{
          margin: 0,
          maxWidth: '100VW',
          overflow: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {accounts.map((account: IAccount, index: number) => {
          return (
            <AccountCard
              key={index}
              _id={account._id}
              userId={account.userId}
              accountName={account.accountName}
              accountNumber={account.accountNumber}
              accountBalance={account.accountBalance}
              bank={account.bank}
              created={account.created}
            />
          );
        })}
        <RegisterAccountModal
          open={registerAccountModalOpen}
          setOpen={setRegisterAccountModalOpen}
          userId={userDetails.userId}
        />
        <RegisterExpenseModal
          open={registerExpenseModalOpen}
          setOpen={setRegisterExpenseModalOpen}
        />
      </Box>
    </>
  );
}
