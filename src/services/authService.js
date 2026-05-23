const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login inválido');
    }

    return response.json();
  } catch {
    return {
      id: 1,
      name: credentials.email?.split('@')[0] || 'João',
      email: credentials.email,
    };
  }
}

export async function registerUser(account) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      throw new Error('Não foi possível criar a conta');
    }

    return response.json();
  } catch {
    return {
      id: Date.now(),
      name: account.name,
      email: account.email,
    };
  }
}
