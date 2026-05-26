const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function normalizeAmount(amount) {
  const numericAmount = Number(amount);
  return Number.isFinite(numericAmount) ? numericAmount : 0;
}

function toFrontendItem(item) {
  if (!item || typeof item !== 'object') {
    return item;
  }

  return {
    ...item,
    amount: normalizeAmount(item.amount),
    date: item.date || item.transactionDate,
  };
}

function toBackendItem(item) {
  if (!item || typeof item !== 'object') {
    return item;
  }

  const { date, ...backendItem } = item;

  return {
    ...backendItem,
    amount: normalizeAmount(backendItem.amount),
    transactionDate: date,
  };
}

function normalizeResponse(data) {
  return Array.isArray(data) ? data.map(toFrontendItem) : toFrontendItem(data);
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return normalizeResponse(await response.json());
}

export const apiClient = {
  getAll: (path) => request(path),
  create: (path, data) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(toBackendItem(data)),
    }),
  update: (path, id, data) =>
    request(`${path}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toBackendItem(data)),
    }),
  remove: (path, id) =>
    request(`${path}/${id}`, {
      method: 'DELETE',
    }),
};
