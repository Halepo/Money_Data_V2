import './accountCard.sass';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IAccount } from '../../../../helpers/interface/account';
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
    <div className="account-card-wrapper">
      <div>
        <h5>{accountName}</h5>
        <p className="mb-2">Bank: {bank}</p>
        <p className="mb-2">
          <small>
            <i>Account Number: </i>
          </small>
          {accountNumber}
        </p>
        <p>
          <small>
            <i>Balance : </i>
          </small>
          {accountBalance} Birr
        </p>
      </div>
      <div>
        <button className="btn btn-outline-secondary">See Transactions</button>
      </div>
    </div>
  );
}
