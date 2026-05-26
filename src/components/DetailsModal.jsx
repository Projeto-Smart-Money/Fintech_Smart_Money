import { useNavigate } from 'react-router-dom';
import { formatCurrency, sumTransactions } from '../utils/currency.js';

export default function DetailsModal({ incomes, expenses, goals }) {
  const navigate = useNavigate();
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

  function closeModal() {
    const modalElement = document.getElementById('detalhesModal');
    const bootstrapModal = window.bootstrap?.Modal?.getInstance(modalElement);

    if (bootstrapModal) {
      bootstrapModal.hide();
    }

    modalElement?.classList.remove('show');
    modalElement?.setAttribute('aria-hidden', 'true');
    modalElement?.removeAttribute('aria-modal');
    modalElement?.removeAttribute('role');
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
  }

  function handleOpenSection(path) {
    closeModal();
    navigate(path);
  }

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
              <span>Saldo disponivel</span>
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
                    <button type="button" onClick={() => handleOpenSection(section.to)}>
                      Abrir
                    </button>
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
