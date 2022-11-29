import { useEffect, useState } from 'react';
import './accounts.sass';
import { MakeRequest } from '../../../../helpers/services/apiService';
import { IAccount } from '../../../../helpers/interface/account';

import AccountCard from './accountCard';
import RegisterAccountModal from './registerAccountModal';

import useAuth from '../../../../helpers/hooks/useAuth';
import { decodeJWT } from '../../../../helpers/services/utils';
import CardContainer from '../../../shared/cardContainer';
export default function Accounts() {
  //register account modal
  const [registerAccountModalOpen, setRegisterAccountModalOpen] =
    useState(false);

  const { userDetails }: any = useAuth();
  const [accounts, setAccounts] = useState([]);

  const fetchAccount = () => {
    const userId = decodeJWT(userDetails.data.accessToken).user_id;
    console.log(`Fetching accounts for userId [${userId}]`);
    const account = async (userId: string) => {
      const response: any = await MakeRequest({
        url: `account?user_id=${userId}`,
        method: 'get',
        data: null,
        needAuthorization: true,
      });
      console.log(response, 'res');
      if (response.length > 0) setAccounts(response);
    };
    account(userId).catch(console.error);
  };

  //update account list on account modal change
  useEffect(() => {
    return () => {
      fetchAccount();
    };
  }, [registerAccountModalOpen]);

  const HeadContent = () => {
    return (
      <>
        <button
          className="btn btn-outline-secondary accounts-section-button"
          onClick={() => setRegisterAccountModalOpen(true)}
        >
          Create Money Account
        </button>
      </>
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
        <RegisterAccountModal
          open={registerAccountModalOpen}
          setOpen={setRegisterAccountModalOpen}
          userId={userDetails.data.userId}
        />
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
