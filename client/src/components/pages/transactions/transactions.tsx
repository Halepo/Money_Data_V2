import CardContainer from "../../shared/cardContainer";
import TransactionsDataTable from "./transactionsDataTable";

export default function transactions(props: any) {
  console.log("transaction rendered!");
  return (
    <>
      <CardContainer
        cardTitle="Transactions"
        bodyContent={<TransactionsDataTable />}
      />
    </>
  );
}
