import TransactionPage from '../components/TransactionPage.jsx';
import { initialIncomes } from '../data/financeData.js';

export default function IncomePage() {
  return (
    <TransactionPage
      title="Rendas"
      subtitle="Entradas financeiras"
      addLabel="Adicionar renda"
      variant="income"
      initialItems={initialIncomes}
      endpoint="/rendas"
    />
  );
}
