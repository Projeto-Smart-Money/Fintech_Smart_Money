import { useEffect, useState } from 'react';
import DetailsModal from '../components/DetailsModal.jsx';
import SummaryCard from '../components/SummaryCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { initialExpenses, initialGoals, initialIncomes } from '../data/financeData.js';
import { apiClient } from '../services/apiClient.js';
import { formatCurrency, sumTransactions } from '../utils/currency.js';

function tagItems(items, type) {
  return items.map((item) => ({
    ...item,
    type,
  }));
}

export default function Dashboard() {
  const { user } = useAuth();
  const [recentItems, setRecentItems] = useState(() =>
    tagItems([...initialIncomes, ...initialExpenses], 'Registro')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3),
  );
  const [recentStatus, setRecentStatus] = useState('Resumo simples');
  const totalIncome = sumTransactions(initialIncomes);
  const totalExpense = sumTransactions(initialExpenses);
  const balance = totalIncome - totalExpense;

  useEffect(() => {
    let isMounted = true;

    async function loadRecentItems() {
      try {
        const [incomes, expenses, goals] = await Promise.all([
          apiClient.getAll('/rendas'),
          apiClient.getAll('/despesas'),
          apiClient.getAll('/metas'),
        ]);

        if (!isMounted) {
          return;
        }

        const apiItems = [
          ...tagItems(incomes, 'Renda'),
          ...tagItems(expenses, 'Despesa'),
          ...tagItems(goals, 'Meta'),
        ]
          .sort((a, b) => {
            const dateComparison = new Date(b.date) - new Date(a.date);
            return dateComparison || Number(b.id || 0) - Number(a.id || 0);
          })
          .slice(0, 3);

        setRecentItems(apiItems);
        setRecentStatus('Ultimas adicoes');
      } catch {
        if (isMounted) {
          setRecentStatus('Dados demonstrativos');
        }
      }
    }

    loadRecentItems();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="dashboard-shell">
        <h1 className="dashboard-title">SMART-MONEY</h1>

        <div className="dashboard-greeting">
          <span>Ola, {user?.name || 'Joao'}</span>
          <i className="bi bi-person-circle" />
        </div>

        <div className="balance-block">
          <p>Saldo disponivel</p>
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
            <h2>Ultimos registros</h2>
            <span>{recentStatus}</span>
          </div>

          <div className="dashboard-recent-list">
            {recentItems.map((item) => (
              <div className="dashboard-recent-item" key={`${item.type}-${item.id}-${item.title}-${item.date}`}>
                <div>
                  <span>{item.title}</span>
                  <small>{item.type}</small>
                </div>
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
