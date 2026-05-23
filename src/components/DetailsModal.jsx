import { Link } from 'react-router-dom';
import { formatCurrency, sumTransactions } from '../utils/currency.js';

export default function DetailsModal({ incomes, expenses, goals }) {
  const totalIncome = sumTransactions(incomes);
  const totalExpense = sumTransactions(expenses);
  const balance = totalIncome - totalExpense;

  const sections = [
    {
      title: 'Rendas',
      detail: `${incomes.length} registros`,
      value: formatCurrency(totalIncome),
      to: '/rendas',
    },
    {
      title: 'Despesas',
      detail: `${expenses.length} registros`,
      value: formatCurrency(totalExpense),
      to: '/despesas',
    },
    {
      title: 'Metas',
      detail: `${goals.length} metas`,
      value: 'Ver metas',
      to: '/metas',
    },
  ];

  return (
    <div className="modal fade" id="detalhesModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content details-modal">
          <div className="modal-header details-modal-header">
            <div>
              <span>Smart-Money</span>
              <h5 className="modal-title">Resumo financeiro</h5>
            </div>
            <button className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" />
          </div>

          <div className="modal-body details-modal-body">
            <div className="details-balance">
              <span>Saldo disponível</span>
              <strong>{formatCurrency(balance)}</strong>
            </div>

            <div className="details-simple-list">
              {sections.map((section) => (
                <div className="details-simple-row" key={section.title}>
                  <div>
                    <strong>{section.title}</strong>
                    <span>{section.detail}</span>
                  </div>
                  <div className="details-simple-action">
                    <em>{section.value}</em>
                    <Link to={section.to} data-bs-dismiss="modal">
                      Abrir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
