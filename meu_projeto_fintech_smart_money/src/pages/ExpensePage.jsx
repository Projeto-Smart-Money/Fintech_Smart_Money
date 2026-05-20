import TransactionPage from '../components/TransactionPage.jsx';
import { initialExpenses } from '../data/financeData.js';

export default function ExpensePage() {
  return (
    <TransactionPage
      title="Despesas"
      subtitle="Saídas financeiras"
      addLabel="Adicionar despesa"
      variant="expense"
      initialItems={initialExpenses}
      endpoint="/despesas"
    />
  );
}
