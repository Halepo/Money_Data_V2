import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../helpers/hooks/useAxiosPrivate';
import { decodeJWT } from '../../helpers/services/utils';
import useAuth from '../../helpers/hooks/useAuth';
import moment from 'moment';

import {
  UilMoneyInsert,
  UilMoneyWithdraw,
  UilEdit,
  UilEye,
  UilTrashAlt,
  UilSkipForwardAlt,
  UilStepBackwardAlt,
  UilBill,
} from '@iconscout/react-unicons';

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
              <UilStepBackwardAlt className="mx-2" />
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
              <UilSkipForwardAlt className="mx-2" />
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  const TableFilters = () => {
    return (
      <div className="p-2 mx-4 mt-2">
        <p>Some filters</p>
      </div>
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
    <div className="col-lg-12 mb-lg-0 mt-4 overflow-hidden">
      <div className="card">
        <div className="card-header pb-0 p-3">
          <div className="d-flex justify-content-between">
            <h6 className="mb-2 p-2 mx-4">
              <UilBill className="mx-4" />
              Recent Transactions
            </h6>
            <p className="text-sm mb-0">
              <i className="bi bi-arrow-up"></i>
              <span className="font-weight-bold">4% more</span> " in 2021 "
            </p>
          </div>
        </div>
        {transactions.length > 0 ? (
          <div className="table-responsive">
            <table className="table align-items-center ">
              <TableFilters />
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Type</th>
                    <th>Account</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ display: 'none' }}>{index}</td>
                        <td>{index}</td>
                        {transaction.type == 'income' ? (
                          <td style={{ backgroundColor: 'rgb(144 255 163)' }}>
                            <UilMoneyInsert /> Income
                          </td>
                        ) : (
                          <td style={{ backgroundColor: 'rgb(255 144 144)' }}>
                            <UilMoneyWithdraw /> Expence
                          </td>
                        )}
                        <td>
                          {transaction.account[0].accountName}{' '}
                          <small>
                            [Balance: {transaction.account[0].accountBalance}]
                          </small>
                        </td>
                        <td>{transaction.category[0].category}</td>
                        <td>{`${transaction.amount} ${transaction.currency}`}</td>
                        <td>{transaction.reason}</td>
                        <td>{moment(transaction.created).format('LLLL')}</td>
                        <td>
                          <UilEdit /> <UilEye /> <UilTrashAlt />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot></tfoot>
              </table>
              <TablePagination />
            </table>
          </div>
        ) : (
          <div className="m-2 p-4">
            <i>No data found. Please add transactions above.</i>
          </div>
        )}
      </div>
    </div>
  );
}
