export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function sumTransactions(transactions) {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}
