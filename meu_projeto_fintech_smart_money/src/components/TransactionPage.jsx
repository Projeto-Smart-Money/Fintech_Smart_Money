import TransactionCard from './TransactionCard.jsx';
import { useCrudResource } from '../hooks/useCrudResource.js';
import { formatCurrency, sumTransactions } from '../utils/currency.js';

export default function TransactionPage({ title, subtitle, addLabel, variant, initialItems, endpoint }) {
  const { items, isLoading, error, createItem, updateItem, deleteItem } = useCrudResource(
    endpoint,
    initialItems,
  );

  function handleAdd() {
    const nextItem = {
      title: variant === 'income' ? 'Nova renda' : variant === 'expense' ? 'Nova despesa' : 'Nova meta',
      description: 'Pronta para conectar com formulário ou API',
      amount: 0,
      category: 'Sem categoria',
      date: new Date().toISOString().slice(0, 10),
    };

    createItem(nextItem);
  }

  function handleEdit(transaction) {
    const newAmount = window.prompt('Informe o novo valor:', String(transaction.amount));
    const parsedAmount = Number(newAmount);

    if (!newAmount || Number.isNaN(parsedAmount)) {
      return;
    }

    updateItem(transaction.id, { ...transaction, amount: parsedAmount });
  }

  function handleDelete(transactionId) {
    deleteItem(transactionId);
  }

  const total = sumTransactions(items);

  return (
    <section className="page-stack">
      <header className="d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <p className="section-kicker mb-2">{subtitle}</p>
          <h1 className="fw-bold mb-0">{title}</h1>
        </div>
        <button className="btn btn-gray px-4 fw-bold rounded-pill align-self-start" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2" />
          {addLabel}
        </button>
      </header>

      <div className="summary-strip">
        <span>Total registrado</span>
        <strong>{formatCurrency(total)}</strong>
      </div>

      {isLoading && <p className="text-white-50 mb-0">Carregando dados...</p>}
      {error && <div className="alert alert-light mb-0">{error}</div>}

      <div className="transaction-grid">
        {items.map((item) => (
          <TransactionCard
            key={item.id}
            transaction={item}
            variant={variant}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}
