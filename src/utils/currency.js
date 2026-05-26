export function parseCurrencyInput(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const trimmedValue = value.trim();
  const normalizedValue = trimmedValue.includes(',')
    ? trimmedValue.replace(/\./g, '').replace(',', '.')
    : trimmedValue;

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function formatCurrency(value) {
  const numericValue = Number(value);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

export function sumTransactions(transactions) {
  return transactions.reduce((total, transaction) => total + parseCurrencyInput(transaction.amount), 0);
}
