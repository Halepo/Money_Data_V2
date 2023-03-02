import { useState } from 'react';

import { MakeRequest } from '../../../helpers/services/apiService';
import { FormError } from '../../../components/shared/formError';

type props = {
  userId: string;
};

type TNewAccount = {
  user_id: string;
  name: string;
  balance: number;
  number: string;
  bank: string;
};

export default function RegisterAccountModal({ userId }: props) {
  console.log('register account modal rendered');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState('');
  const [description, setDescription] = useState('');

  // const handleOpen = () => setModalOpen(true);
  const handleRegister = async (): Promise<void> => {
    const newAccount = {
      user_id: userId,
      account_balance: balance,
      bank: bank,
      account_number: number,
      account_name: name,
      account_description: description,
    };
    console.log(newAccount);
    try {
      const registered = await MakeRequest({
        url: 'account',
        method: 'post',
        data: newAccount,
        needAuthorization: true,
      });
      console.log(registered, 'registered');
      // TODO close modal here
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        setError(errorData);
        return;
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="registerAccountModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Register New Account
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="standard-username-input">Account Name</label>
              <input
                tabIndex={1}
                className="register-account-input-field form-control"
                onChange={(e) => setName(e.target.value)}
                required
                id="standard-name-input"
                type="username"
                placeholder="Enter username"
                autoComplete="current-username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="standard-initial-balance-input">
                Initial Balance
              </label>
              <input
                tabIndex={1}
                className="register-account-input-field form-control"
                onChange={(e) => {
                  let accountBalance: number = Number(e.target.value);
                  return setBalance(accountBalance);
                }}
                required
                id="standard-initial-balance-input"
                type="number"
                placeholder="Enter Initial Balance"
              />
            </div>
            <div className="form-group">
              <label htmlFor="standard-description-input">Description</label>
              <input
                tabIndex={1}
                className="register-account-input-field form-control"
                onChange={(e) => {
                  let description: string = e.target.value;
                  return setDescription(description);
                }}
                required
                id="standard-description-input"
                type="number"
                placeholder="Enter Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="standard-account-number-input">
                Account Number
              </label>
              <input
                tabIndex={1}
                className="register-account-input-field form-control"
                onChange={(e) => setNumber(e.target.value)}
                required
                id="standard-account-number-input"
                type="number"
                placeholder="Enter Account Number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="standard-account-number-input">Bank</label>
              <input
                tabIndex={1}
                className="register-account-input-field form-control"
                onChange={(e) => setBank(e.target.value)}
                required
                id="standard-account-number-input"
                type="number"
                placeholder="Enter Your Bank Name"
              />
            </div>
          </div>
          {Object.keys(error).length > 0 ? <FormError error={error} /> : ''}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="btn btn-outline-secondary accounts-section-button"
            >
              Register account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
