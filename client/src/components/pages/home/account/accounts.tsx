import { useEffect, useState } from 'react';
import './accounts.sass';
import useAxiosPrivate from '../../../../helpers/hooks/useAxiosPrivate';
import { IAccount } from '../../../../helpers/interface/account';

import AccountCard from './accountCard';
import RegisterAccountModal from './registerAccountModal';

import useAuth from '../../../../helpers/hooks/useAuth';
import { decodeJWT } from '../../../../helpers/services/utils';
import CardContainer from '../../../shared/cardContainer';
export default function Accounts() {
  const axiosPrivate = useAxiosPrivate();
  const { auth }: any = useAuth();
  const userId = decodeJWT(auth.token).user_id;
  //register account modal
  const [registerAccountModalOpen, setRegisterAccountModalOpen] =
    useState(false);

  const [accounts, setAccounts] = useState([]);

  //update account list on account modal change
  useEffect(() => {
    const userId = decodeJWT(auth.token).user_id;
    console.log(`Fetching account for userId [${userId}]`);
    const account = async (userId: string) => {
      const response: any = await axiosPrivate.get(`account?user_id=${userId}`);
      console.log('Response', response.data.data);
      if (response.data.data.length > 0) {
        setAccounts(response.data.data);
        return response;
      }
    };
    account(userId).catch(console.error);
  }, [registerAccountModalOpen]);

  const HeadContent = () => {
    return (
      <button
        type="button"
        className="btn btn-outline-secondary accounts-section-button"
        data-bs-toggle="modal"
        data-bs-target="#registerAccountModal"
      >
        Create Account
      </button>
    );
  };

  const BodyContent = () => {
    return (
      <>
        {accounts.length === 0 ? (
          <>Loading...</>
        ) : (
          accounts.map((account: IAccount, index: number) => {
            return (
              <AccountCard
                key={index}
                _id={account._id}
                userId={account.userId}
                accountName={account.accountName}
                accountNumber={account.accountNumber}
                accountBalance={account.accountBalance}
                bank={account.bank}
                created={account.created}
              />
            );
          })
        )}

        <RegisterAccountModal userId={userId} />
      </>
    );
  };

  return (
    <>
      <CardContainer
        headContent={<HeadContent />}
        bodyContent={<BodyContent />}
        cardTitle="Accounts"
      />
    </>
  );
}
