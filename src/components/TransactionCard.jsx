import { formatCurrency } from '../utils/currency.js';

export default function TransactionCard({ transaction, variant, onEdit, onDelete }) {
  const iconByVariant = {
    income: 'bi-arrow-down-circle',
    expense: 'bi-arrow-up-circle',
    goal: 'bi-bullseye',
  };
  const icon = iconByVariant[variant] || 'bi-credit-card';

  return (
    <article className="card custom-card transaction-card p-3">
      <div className="d-flex justify-content-between gap-3">
        <div className="d-flex gap-3">
          <span className={`transaction-icon transaction-icon-${variant}`}>
            <i className={`bi ${icon}`} />
          </span>
          <div>
            <h5 className="mb-1">{transaction.title}</h5>
            <p className="text-white-50 mb-2">{transaction.description}</p>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge rounded-pill text-bg-light">{transaction.category}</span>
              <span className="badge rounded-pill text-bg-secondary">
                {new Date(`${transaction.date}T00:00:00`).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        <div className="transaction-actions text-end">
          <strong className="d-block fs-5">{formatCurrency(transaction.amount)}</strong>
          <div className="btn-group mt-3">
            <button className="btn btn-sm btn-outline-light" onClick={() => onEdit(transaction)}>
              Editar
            </button>
            <button className="btn btn-sm btn-outline-light" onClick={() => onDelete(transaction.id)}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
