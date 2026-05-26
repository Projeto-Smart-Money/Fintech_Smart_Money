import { useState } from 'react';
import TransactionCard from './TransactionCard.jsx';
import { useCrudResource } from '../hooks/useCrudResource.js';
import { formatCurrency, parseCurrencyInput, sumTransactions } from '../utils/currency.js';

export default function TransactionPage({ title, subtitle, addLabel, variant, initialItems, endpoint }) {
  const { items, isLoading, error, createItem, updateItem, deleteItem } = useCrudResource(
    endpoint,
    initialItems,
  );
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
  });

  const defaultTitleByVariant = {
    income: 'Nova renda',
    expense: 'Nova despesa',
    goal: 'Nova meta',
  };

  const descriptionByVariant = {
    income: 'Entrada financeira cadastrada',
    expense: 'Despesa cadastrada',
    goal: 'Objetivo financeiro cadastrado',
  };

  const modalTitle = modalMode === 'edit' ? 'Editar item' : addLabel;

  function handleAdd() {
    setSelectedItem(null);
    setFormData({
      title: defaultTitleByVariant[variant],
      description: descriptionByVariant[variant],
      amount: '',
      category: 'Sem categoria',
      date: new Date().toISOString().slice(0, 10),
    });
    setModalMode('create');
  }

  function handleEdit(transaction) {
    setSelectedItem(transaction);
    setFormData({
      title: transaction.title,
      description: transaction.description,
      amount: String(transaction.amount),
      category: transaction.category,
      date: transaction.date,
    });
    setModalMode('edit');
  }

  function handleDelete(transactionId) {
    deleteItem(transactionId);
  }

  function handleCloseModal() {
    setModalMode(null);
    setSelectedItem(null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const parsedAmount = parseCurrencyInput(formData.amount);

    if (!formData.title.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const nextItem = {
      title: formData.title.trim(),
      description: formData.description.trim() || descriptionByVariant[variant],
      amount: parsedAmount,
      category: formData.category.trim() || 'Sem categoria',
      date: formData.date || new Date().toISOString().slice(0, 10),
    };

    if (modalMode === 'edit' && selectedItem) {
      updateItem(selectedItem.id, { ...selectedItem, ...nextItem });
    } else {
      createItem(nextItem);
    }

    handleCloseModal();
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

      {modalMode && (
        <div className="transaction-modal-backdrop" role="presentation">
          <section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title">
            <div className="transaction-modal-header">
              <div>
                <span>{subtitle}</span>
                <h2 id="transaction-modal-title">{modalTitle}</h2>
              </div>
              <button className="transaction-modal-close" type="button" onClick={handleCloseModal} aria-label="Fechar">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form className="transaction-form" onSubmit={handleSubmit}>
              <label>
                <span>Titulo</span>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span>Valor</span>
                <div className="money-input">
                  <small>R$</small>
                  <input
                    name="amount"
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              <label>
                <span>Categoria</span>
                <input
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Data</span>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </label>

              <label className="transaction-form-wide">
                <span>Descricao</span>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>

              <div className="transaction-modal-actions">
                <button type="button" className="btn btn-outline-light" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-gray fw-bold">
                  Salvar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
