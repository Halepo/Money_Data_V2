import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IAccount } from '../../../interface/account';

const data = {
  _id: '62e4f52a2f17311b521afa72',
  userId: '62e4e6c22f17311b521afa71',
  balance: 0,
  accountName: 'Cash',
  bank: 'Pocket',
  accountNumber: 12345,
  created: '2022-07-30T09:08:58.083Z',
};

export default function AccountCard({
  _id,
  userId,
  accountName,
  accountNumber,
  accountBalance,
  bank,
  created,
}: IAccount) {
  return (
    <Card
      sx={{
        display: 'inline-block',
        maxWidth: 400,
        minHeight: '100%',
        margin: '.5rem',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Last Transaction : Income [0 ETB]
        </Typography>
        <Typography variant="h5" component="div">
          {accountName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Bank: {bank}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Account Number: {accountNumber}
        </Typography>
        <Typography variant="body2">Balance : {accountBalance} Birr</Typography>
      </CardContent>
      <CardActions sx={{ bottom: 0 }}>
        <Button size="small">See Transactions</Button>
      </CardActions>
    </Card>
  );
}
