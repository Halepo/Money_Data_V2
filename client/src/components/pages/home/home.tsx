import './home.sass';

import Accounts from '../home/account/accounts';
import Expenses from '../home/expense/expense';
import Incomes from '../home/income/income';

export default function Home(props: any) {
  console.log('Home rendered!');

  return (
    <div className="home-wrapper">
      <Accounts />
      <Expenses />
      <Incomes />
    </div>
  );
}
