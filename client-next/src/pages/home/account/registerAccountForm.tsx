import { useState } from "react";

import { MakeRequest } from "../../../helpers/services/apiService";
import { FormError } from "../../../components/shared/formError";

import InputField from "../../../components/shared/inputField";

import useUI from "../../../helpers/hooks/useUI";

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

export const RegisterAccountForm = ({ userId }: any) => {
  console.log("register account modal rendered");
  const { setModalContent, setIsModalOpen } = useUI();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [number, setNumber] = useState("");
  const [bank, setBank] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async (): Promise<void> => {
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
        url: "account",
        method: "post",
        data: newAccount,
        needAuthorization: true,
      });
      console.log(registered, "registered");
      setIsModalOpen(false);
      setModalContent(<></>);
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        setError(errorData);
        return;
      }
    }
  };

  return (
    <>
      <InputField
        label="User Name"
        tabIndex={1}
        className="register-account-input-field form-control"
        onChange={(e) => setName(e.target.value)}
        required
        id="standard-name-input"
        type="username"
        placeholder="Enter username"
        autoComplete="current-username"
      />
      <InputField
        label="Account Balance"
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
      <InputField
        label="Description"
        tabIndex={1}
        className="register-account-input-field form-control"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        required
        id="standard-description-input"
        type="number"
        placeholder="Enter Description"
      />

      <InputField
        label="Account Number"
        tabIndex={1}
        className="register-account-input-field form-control"
        onChange={(e) => setNumber(e.target.value)}
        required
        id="standard-account-number-input"
        type="number"
        placeholder="Enter Account Number"
      />
      <InputField
        label="Bank Name"
        tabIndex={1}
        className="register-account-input-field form-control"
        onChange={(e) => setBank(e.target.value)}
        required
        id="standard-account-number-input"
        type="number"
        placeholder="Enter Your Bank Name"
      />
      {Object.keys(error).length > 0 ? <FormError error={error} /> : ""}
    </>
  );
};
