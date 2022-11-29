import { useEffect, useState } from 'react';
import './expenses.sass';
import moment from 'moment';
import { MakeRequest } from '../../../../helpers/services/apiService';

import useAuth from '../../../../helpers/hooks/useAuth';
import { decodeJWT } from '../../../../helpers/services/utils';
import CardContainer from '../../../shared/cardContainer';
export default function Expenses() {
  const { userDetails }: any = useAuth();
  const [expenses, setExpenses] = useState([]);

  const fetchAccount = () => {
    const userId = decodeJWT(userDetails.data.accessToken).user_id;
    console.log(`Fetching expenses for userId [${userId}]`);
    const account = async (userId: string) => {
      const response: any = await MakeRequest({
        url: `expense?user_id=${userId}`,
        method: 'get',
        data: null,
        needAuthorization: true,
      });
      console.log(response, 'res');
      if (response.length > 0) setExpenses(response);
    };
    account(userId).catch(console.error);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  //update account list on account modal change

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
