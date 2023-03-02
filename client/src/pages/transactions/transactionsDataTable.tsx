import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../helpers/hooks/useAxiosPrivate';
import { decodeJWT } from '../../helpers/services/utils';
import useAuth from '../../helpers/hooks/useAuth';
import moment from 'moment';

export default function transactionsDataTable(props: any) {
  const { auth }: any = useAuth();
  const [transactions, setTransactions] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const TablePagination = () => {
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  useEffect(() => {
    const userId = decodeJWT(auth.token).user_id;
    console.log(`Fetching transactions for userId [${userId}]`);
    const transaction = async (userId: string) => {
      const response: any = await axiosPrivate.get(
        `transaction?user_id=${userId}`
      );
      console.log('Response', response.data.data);
      if (response.data.data.length > 0) {
        setTransactions(response.data.data);
        return response;
      }
    };
    transaction(userId).catch(console.error);
  }, []);

  return (
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Account ID</th>
          <th>Category ID</th>
          <th>Amount</th>
          <th>Reason</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          return (
            <tr key={index}>
              <td>{transaction.userId}</td>
              <td>{transaction.accountId}</td>
              <td>{transaction.categoryId}</td>
              <td>{`${transaction.amount} Birr `}</td>
              <td>{transaction.reason}</td>
              <td>{moment(transaction.created).format('LLLL')}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <TablePagination />
      </tfoot>
    </table>
  );
}
