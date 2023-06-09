import {
  UilBill,
  UilCornerRightDown,
  UilCornerUpLeft,
  UilEdit,
  UilEye,
  UilSkipForwardAlt,
  UilStepBackwardAlt,
  UilTrashAlt,
} from '@iconscout/react-unicons';
import moment from 'moment';
import { useEffect, useState } from 'react';

import useAuth from '@/lib/hooks/useAuth';
import useAxiosPrivate from '@/lib/hooks/useAxiosPrivate';
import { decodeJWT } from '@/lib/jwtDecode';
import Logger from '@/lib/logger';

import Modal from '@/components/shared/modal';

export default function TransactionsDataTable(props: any) {
  const { auth }: any = useAuth();
  Logger.info(auth, 'auth in transactionsDataTable');
  const [transactions, setTransactions] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const TablePagination = () => {
    return (
      <nav>
        <ul className='pagination justify-content-center'>
          <li className='page-item disabled'>
            <a className='page-link' href='#' tabIndex={-1}>
              <UilStepBackwardAlt className='mx-2' />
              Previous
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              1
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              2
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              3
            </a>
          </li>
          <li className='page-item'>
            <a className='page-link' href='#'>
              Next
              <UilSkipForwardAlt className='mx-2' />
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  const TableFilters = () => {
    return (
      <div className='mx-4 mt-2 p-2'>
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
    <div className='col-lg-12 mb-lg-0 mt-4 overflow-hidden'>
      <div className='card'>
        <div className='card-header p-3 pb-0'>
          <div className='d-flex justify-content-between'>
            <h6 className='mx-4 mb-2 p-2'>
              <UilBill className='mx-4' />
              Recent Transactions
            </h6>
            <p className='mb-0 text-sm'>
              <i className='bi bi-arrow-up'></i>
              <span className='font-weight-bold'>4% more</span> " in 2021 "
            </p>
          </div>
        </div>
        {transactions.length > 0 ? (
          <div className='table-responsive'>
            <table className='align-items-center table '>
              <TableFilters />
              <table className='table-striped table-hover table-bordered table'>
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
                  {transactions.map((transaction: any, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ display: 'none' }}>{index}</td>
                        <td>{index}</td>
                        {transaction.type == 'income' ? (
                          <td style={{ backgroundColor: 'rgb(206 255 219)' }}>
                            <UilCornerRightDown /> Income
                          </td>
                        ) : (
                          <td style={{ backgroundColor: 'rgb(255 206 206)' }}>
                            <UilCornerUpLeft /> Expence
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
                        <td style={{ display: 'flex' }}>
                          <Modal title='Edit' buttonIcon={<UilEdit />} />
                          <Modal title='View' buttonIcon={<UilEye />} />
                          <Modal title='Delete' buttonIcon={<UilTrashAlt />} />
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
          <div className='m-2 p-4'>
            <i>No data found. Please add transactions above.</i>
          </div>
        )}
      </div>
    </div>
  );
}
