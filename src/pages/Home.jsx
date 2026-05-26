import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { initialExpenses, initialIncomes } from '../data/financeData.js';
import { formatCurrency, sumTransactions } from '../utils/currency.js';

export default function Home() {
  const { user } = useAuth();
  const totalIncome = sumTransactions(initialIncomes);
  const totalExpense = sumTransactions(initialExpenses);
  const balance = totalIncome - totalExpense;
  const recentItems = [...initialIncomes, ...initialExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <section className="home-dashboard">
      <div className="home-hero-panel">
        <div>
          <p className="section-kicker mb-2">Smart-Money</p>
          <h1>Ola, {user?.name}</h1>
          <p>
            Veja um resumo simples das suas entradas e saidas. Depois, use as telas de rendas e despesas
            para cadastrar, editar ou excluir registros.
          </p>
        </div>

        <div className="home-balance-card">
          <span>Saldo disponivel</span>
          <strong>{formatCurrency(balance)}</strong>
          <small>Resumo demonstrativo. Gerencie os registros nas telas internas.</small>
        </div>
      </div>

      <div className="home-actions">
        <Link className="btn btn-gray px-4 fw-bold rounded-pill" to="/dashboard">
          <i className="bi bi-grid me-2" />
          Abrir dashboard
        </Link>
        <Link className="btn btn-outline-light px-4 rounded-pill" to="/rendas">
          <i className="bi bi-plus-circle me-2" />
          Gerenciar rendas
        </Link>
        <Link className="btn btn-outline-light px-4 rounded-pill" to="/despesas">
          <i className="bi bi-receipt me-2" />
          Ver despesas
        </Link>
      </div>

      <div className="home-metrics-grid home-metrics-grid-simple">
        <article className="home-metric-card">
          <span>Rendas</span>
          <strong>{formatCurrency(totalIncome)}</strong>
          <small>{initialIncomes.length} registros cadastrados</small>
        </article>

        <article className="home-metric-card">
          <span>Despesas</span>
          <strong>{formatCurrency(totalExpense)}</strong>
          <small>{initialExpenses.length} registros cadastrados</small>
        </article>
      </div>

      <article className="home-panel home-panel-simple">
        <div className="home-panel-header">
          <div>
            <span>Atividade recente</span>
            <h2>Ultimos registros</h2>
          </div>
        </div>

        <div className="home-activity-list">
          {recentItems.map((item) => (
            <div className="home-activity-item" key={`${item.id}-${item.title}-${item.date}`}>
              <i className="bi bi-credit-card" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.category}</span>
              </div>
              <em>{formatCurrency(item.amount)}</em>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
