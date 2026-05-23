import DetailsModal from '../components/DetailsModal.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { initialExpenses, initialGoals, initialIncomes } from '../data/financeData.js';
import { formatCurrency, sumTransactions } from '../utils/currency.js';

export default function Dashboard() {
  const { user } = useAuth();
  const totalIncome = sumTransactions(initialIncomes);
  const totalExpense = sumTransactions(initialExpenses);
  const balance = totalIncome - totalExpense;
  const recentItems = [...initialIncomes, ...initialExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      <section className="dashboard-shell">
        <h1 className="dashboard-title">SMART-MONEY</h1>

        <div className="dashboard-greeting">
          <span>Olá, {user?.name || 'João'}</span>
          <i className="bi bi-person-circle" />
        </div>

        <div className="balance-block">
          <p>Saldo disponível</p>
          <strong>{formatCurrency(balance)}</strong>
        </div>

        <div className="row g-3 dashboard-cards">
          <div className="col-12 col-md-6">
            <SummaryCard
              title="Renda"
              amount={totalIncome}
              to="/rendas"
              icon="bi-wallet2"
              actionLabel="Abrir rendas"
            />
          </div>

          <div className="col-12 col-md-6">
            <SummaryCard
              title="Despesas"
              amount={totalExpense}
              to="/despesas"
              icon="bi-receipt"
              actionLabel="Abrir despesas"
            />
          </div>
        </div>

        <div className="dashboard-recent custom-card">
          <div className="dashboard-recent-header">
            <h2>Últimos registros</h2>
            <span>Resumo simples</span>
          </div>

          <div className="dashboard-recent-list">
            {recentItems.map((item) => (
              <div className="dashboard-recent-item" key={`${item.title}-${item.date}`}>
                <span>{item.title}</span>
                <strong>{formatCurrency(item.amount)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-actions">
          <button
            className="btn btn-gray px-5 py-2 fw-bold rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#detalhesModal"
          >
            VER DETALHES
          </button>
        </div>
      </section>

      <DetailsModal incomes={initialIncomes} expenses={initialExpenses} goals={initialGoals} />
    </>
  );
}
