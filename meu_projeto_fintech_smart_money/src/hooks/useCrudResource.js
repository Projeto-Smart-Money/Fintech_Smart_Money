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
          setError('API indisponível. Exibindo dados locais temporários.');
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
    } catch {
      setItems((currentItems) => [localItem, ...currentItems]);
      setError('Item criado localmente. Configure a API para persistir no banco.');
    }
  }

  async function updateItem(id, data) {
    try {
      const updatedItem = await apiClient.update(endpoint, id, data);
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === id ? updatedItem : item)),
      );
    } catch {
      setItems((currentItems) =>
        currentItems.map((item) => (item.id === id ? { ...item, ...data } : item)),
      );
      setError('Item atualizado localmente. Configure a API para persistir no banco.');
    }
  }

  async function deleteItem(id) {
    try {
      await apiClient.remove(endpoint, id);
    } catch {
      setError('Item removido localmente. Configure a API para persistir no banco.');
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
