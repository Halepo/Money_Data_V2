import React from 'react';
import Modal from '../../layout/modal/modal';

export default function ActionButtons() {
  return (
    <div className="">
      <button
        className="btn btn btn-secondary p-2 m-2"
        onClick={
          () => ''
          // setRegisterExpenseModalOpen(true)
        }
      >
        New Expense
      </button>
      <button
        className="btn btn btn-secondary p-2 m-2"
        // onClick={() => setRegisterForm('income')}
      >
        New Income
      </button>
      <Modal />
    </div>
  );
}
