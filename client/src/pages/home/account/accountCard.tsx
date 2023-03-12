import './accountCard.sass';
import { IAccount } from '../../../helpers/interface/account';
import moment from 'moment';
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
    <div className="card text-center">
      <div className="card-header">{accountName}</div>
      <div className="card-body">
        <h5 className="card-title">Bank: {bank}</h5>
        <p className="card-text">
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
        <button className="btn btn-outline-secondary">See Transactions</button>
      </div>
      <div className="card-footer text-muted">
        {moment(created).format('LLLL')}
      </div>
    </div>
  );
}
