import { useEffect, useState } from 'react';
import './income.sass';
import moment from 'moment';
import { MakeRequest } from '../../../../helpers/services/apiService';

import useAuth from '../../../../helpers/hooks/useAuth';
import { decodeJWT } from '../../../../helpers/services/utils';
import CardContainer from '../../../shared/cardContainer';
export default function Incomes() {
  const { userDetails }: any = useAuth();
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = () => {
    const userId = decodeJWT(userDetails.data.accessToken).user_id;
    console.log(`Fetching incomes for userId [${userId}]`);
    const account = async (userId: string) => {
      const response: any = await MakeRequest({
        url: `income?user_id=${userId}`,
        method: 'get',
        data: null,
        needAuthorization: true,
      });
      console.log(response, 'res');
      if (response.length > 0) setIncomes(response);
    };
    account(userId).catch(console.error);
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  //update account list on account modal change
  const HeadContent = () => {
    return (
      <>
        <button
          className="btn btn-outline-secondary accounts-section-button"
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
        cardTitle="Incomes"
      />
    </>
  );
}
