import Logger from '@/helpers/lib/logger';

import TransactionsDataTable from './transactions/transactionsDataTable';

export default function Transactions(props: any) {
  Logger.info('transaction rendered!');
  return (
    <div className='mt-3'>
      <TransactionsDataTable />
    </div>
  );
}
