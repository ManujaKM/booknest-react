import { useCallback, useState } from 'react';

// SETUP STEPS:
// 1. Go to https://console.cloud.google.com
// 2. Create a new project
// 3. Enable "Books API" from API Library
// 4. Go to Credentials -> Create API Key
// 5. Copy the key into .env as REACT_APP_GOOGLE_BOOKS_API_KEY
// 6. Restart dev server after adding .env

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1';

const normalizeBook = (item) => {
  const info = item?.volumeInfo || {};
  return {
    id: item.id,
    title: info.title || 'Unknown Title',
    authors: info.authors?.join(', ') || 'Unknown Author',
    thumbnail: info.imageLinks?.thumbnail || null,
    rating: info.averageRating || 0,
    description: info.description || 'No description available.',
    pageCount: info.pageCount || 'N/A',
    categories: info.categories || []
  };
};

const getErrorMessage = (response) => {
  if (response.status === 429) {
    return 'API quota exceeded. Try again later.';
  }
  return 'Failed to fetch books.';
};

const useBooksAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCache, setSearchCache] = useState({});
  const [bookCache, setBookCache] = useState({});

  const searchBooks = useCallback(async (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    if (searchCache[trimmed]) {
      return searchCache[trimmed];
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/volumes?q=${encodeURIComponent(trimmed)}&maxResults=10&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(getErrorMessage(response));
      }

      const data = await response.json();
      const mapped = data.items?.map(normalizeBook) || [];

      setSearchCache((prev) => ({ ...prev, [trimmed]: mapped }));
      return mapped;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch books.';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [searchCache]);

  const getBookById = useCallback(async (id) => {
    if (!id) {
      return null;
    }

    if (bookCache[id]) {
      return bookCache[id];
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/volumes/${id}?key=${API_KEY}`);

      if (!response.ok) {
        throw new Error(getErrorMessage(response));
      }

      const data = await response.json();
      const mapped = normalizeBook(data);

      setBookCache((prev) => ({ ...prev, [id]: mapped }));
      return mapped;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch books.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [bookCache]);

  return {
    searchBooks,
    getBookById,
    isLoading,
    error
  };
};

export default useBooksAPI;
