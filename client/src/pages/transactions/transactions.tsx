import CardContainer from '../../components/shared/cardContainer';
import TransactionsDataTable from './transactionsDataTable';

export default function transactions(props: any) {
  console.log('transaction rendered!');
  return (
    <div className="mt-3">
      <TransactionsDataTable />
    </div>
  );
}
