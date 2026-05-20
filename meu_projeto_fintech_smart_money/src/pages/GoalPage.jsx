import TransactionPage from '../components/TransactionPage.jsx';
import { initialGoals } from '../data/financeData.js';

export default function GoalPage() {
  return (
    <TransactionPage
      title="Metas"
      subtitle="Objetivos financeiros"
      addLabel="Adicionar meta"
      variant="goal"
      initialItems={initialGoals}
      endpoint="/metas"
    />
  );
}
