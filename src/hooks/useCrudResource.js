import { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient.js';

export function useCrudResource(endpoint, fallbackItems) {
  const [items, setItems] = useState(fallbackItems);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const data = await apiClient.getAll(endpoint);
        if (isMounted) {
          setItems(data);
          setError('');
        }
      } catch {
        if (isMounted) {
          setItems(fallbackItems);
          setError('API indisponivel. Exibindo dados locais temporarios.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [endpoint, fallbackItems]);

  async function createItem(data) {
    const localItem = { ...data, id: Date.now() };

    try {
      const createdItem = await apiClient.create(endpoint, data);
      setItems((currentItems) => [createdItem, ...currentItems]);
      setError('');
    } catch {
      setItems((currentItems) => [localItem, ...currentItems]);
      setError('Salvo apenas nesta tela. Para gravar no banco, inicie/configure a API.');
    }
  }

  async function updateItem(id, data) {
    try {
      const updatedItem = await apiClient.update(endpoint, id, data);
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === id ? updatedItem : item)),
      );
      setError('');
    } catch {
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === id ? { ...item, ...data } : item)),
      );
      setError('Atualizado apenas nesta tela. Para gravar no banco, inicie/configure a API.');
    }
  }

  async function deleteItem(id) {
    try {
      await apiClient.remove(endpoint, id);
      setError('');
    } catch {
      setError('Removido apenas desta tela. Para gravar no banco, inicie/configure a API.');
    } finally {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }
  }

  return {
    items,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
  };
}
