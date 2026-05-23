const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Ponto central de integração com o backend.
// Se os controllers usarem outros nomes de rota, ajuste os endpoints nas páginas.
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

  return response.json();
}

export const apiClient = {
  getAll: (path) => request(path),
  create: (path, data) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (path, id, data) =>
    request(`${path}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  remove: (path, id) =>
    request(`${path}/${id}`, {
      method: 'DELETE',
    }),
};
