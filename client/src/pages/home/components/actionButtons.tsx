import CustomButton from '../../../components/shared/customButton';
import Modal from '../../layout/modal/modal';

import { UilPlusCircle } from '@iconscout/react-unicons';

const ExpenseModal = () => (
  <div>
    This is a new exp<div>This is a new expense modal content!!! yesss!!!!</div>
    <div>This is a new expense modal content!!! yesss!!!!</div>
    <div>This is a new expense modal content!!! yesss!!!!</div>
    <div>This is a new expense modal content!!! yesss!!!!</div>
    <div>This is a new expense modal content!!! yesss!!!!</div>
    <div>This is a new expense modal content!!! yesss!!!!</div>ense modal
    content!!! yesss!!!!
  </div>
);

export default function ActionButtons() {
  return (
    <div className="row">
      <Modal
        buttonName="Add Expense"
        buttonIcon={<UilPlusCircle />}
        buttonMaxWidth="16rem"
      />
      <Modal
        buttonName="Add Income"
        buttonIcon={<UilPlusCircle />}
        modalContent={<ExpenseModal />}
        buttonMaxWidth="16rem"
      />
    </div>
  );
}
