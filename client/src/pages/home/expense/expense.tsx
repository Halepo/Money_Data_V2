import { useEffect, useState } from 'react';
import './expenses.sass';
import moment from 'moment';
import { MakeRequest } from '../../../helpers/services/apiService';

import useAxiosPrivate from '../../../helpers/hooks/useAxiosPrivate';
import useAuth from '../../../helpers/hooks/useAuth';
import { decodeJWT } from '../../../helpers/services/utils';
import CardContainer from '../../../components/shared/cardContainer';
export default function Expenses() {
  const { auth }: any = useAuth();
  const [expenses, setExpenses] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const userId = decodeJWT(auth.token).user_id;
    console.log(`Fetching expense for userId [${userId}]`);
    const expense = async (userId: string) => {
      const response: any = await axiosPrivate.get(`expense?user_id=${userId}`);
      console.log('Response', response.data.data);
      if (response.data.data.length > 0) {
        setExpenses(response.data.data);
        return response;
      }
    };
    expense(userId).catch(console.error);
  }, []);

  const HeadContent = () => {
    return (
      <>
        <button
          className="btn btn-outline-secondary accounts-section-button"
          //   onClick={() => setRegisterAccountModalOpen(true)}
        >
          Create expense
        </button>
      </>
    );
  };

  const BodyContent = () => {
    return (
      <>
        {expenses.map((expense: any, index: number) => {
          return (
            <div key={expense._id}>
              <div>{moment(expense.created).format('LLLL')}</div>
              <div style={{ display: 'flex' }}>
                <h3
                  style={{ marginRight: '1rem' }}
                >{`${expense.amount} Birr `}</h3>
                <span style={{ marginRight: '1rem' }}>{expense.reason}</span>
                <small>
                  <i>{expense.description}</i>
                </small>
              </div>
              <hr />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <CardContainer
        headContent={<HeadContent />}
        bodyContent={<BodyContent />}
        cardTitle="Expenses"
      />
    </>
  );
}
