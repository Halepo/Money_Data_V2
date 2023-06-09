import moment from 'moment';
import { useEffect, useState } from 'react';
import './income.sass';

import { decodeJWT } from '@/helpers/lib/jwtDecode';

import CardContainer from '../../../components/shared/cardContainer';
import useAuth from '../../../helpers/hooks/useAuth';
import useAxiosPrivate from '../../../helpers/hooks/useAxiosPrivate';
export default function Incomes() {
  const { auth }: any = useAuth();
  const [incomes, setIncomes] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const userId = decodeJWT(auth.token).user_id;
    console.log(`Fetching income for userId [${userId}]`);
    const income = async (userId: string) => {
      const response: any = await axiosPrivate.get(`income?user_id=${userId}`);
      console.log('Response', response.data.data);
      if (response.data.data.length > 0) {
        setIncomes(response.data.data);
        return response;
      }
    };
    income(userId).catch(console.error);
  }, []);

  //update account list on account modal change
  const HeadContent = () => {
    return (
      <>
        <button
          className='btn btn-outline-secondary accounts-section-button'
          //   onClick={() => setRegisterAccountModalOpen(true)}
        >
          Create Income
        </button>
      </>
    );
  };

  const BodyContent = () => {
    return (
      <>
        {incomes.map((income: any) => {
          return (
            <div key={income._id}>
              <div>{moment(income.created).format('LLLL')}</div>
              <h4>{income.amount} Birr</h4>
              <div>
                {income.reason}{' '}
                <small>
                  <i>{income.description}</i>
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
        cardTitle='Incomes'
      />
    </>
  );
}
