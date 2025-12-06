import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
      return newFavorites;
    });
  };

  const isFavorite = (id: number) => favorites.has(id);

  return { favorites, toggleFavorite, isFavorite };
}
