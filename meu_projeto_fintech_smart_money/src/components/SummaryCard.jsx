import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency.js';

export default function SummaryCard({ title, amount, to, icon, actionLabel = 'Mostrar detalhes' }) {
  return (
    <div className="card custom-card summary-card h-100">
      <div className="d-flex align-items-start justify-content-between gap-3">
        <div>
          <p>{title}</p>
          <h2>{formatCurrency(amount)}</h2>
        </div>
        <i className={`bi ${icon}`} />
      </div>

      <Link className="summary-card-link" to={to}>
        {actionLabel}
        <i className="bi bi-arrow-right" />
      </Link>
    </div>
  );
}
