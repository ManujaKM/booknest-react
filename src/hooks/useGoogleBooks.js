import { useCallback, useState } from 'react';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
const BASE = 'https://www.googleapis.com/books/v1/volumes';

export const useGoogleBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const searchBooks = useCallback(async ({
    query = 'bestseller books 2024',
    category = '',
    maxResults = 20,
    startIndex = 0,
    orderBy = 'relevance'
  } = {}) => {
    const fetchOpenLibrary = async (q) => {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=${maxResults}&offset=${startIndex}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Open Library request failed (${res.status})`);
      }
      const data = await res.json();
      const mapped = (data.docs || []).map((doc) => ({
        id: doc.key,
        title: doc.title || 'Unknown Title',
        author: doc.author_name?.[0] || 'Unknown Author',
        authors: doc.author_name || [],
        description: '',
        thumbnail: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
        smallThumbnail: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg` : null,
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        ratingsCount: Math.floor(Math.random() * 5000 + 100),
        pageCount: doc.number_of_pages_median || 0,
        categories: doc.subject ? doc.subject.slice(0, 3) : [],
        publisher: doc.publisher?.[0] || '',
        publishedDate: doc.first_publish_year ? String(doc.first_publish_year) : '',
        language: doc.language?.[0] || 'en',
        previewLink: '',
        infoLink: '',
        price: (Math.random() * 20 + 6).toFixed(2),
        originalPrice: (Math.random() * 10 + 18).toFixed(2),
        condition: ['New', 'Like New', 'Good'][Math.floor(Math.random() * 3)],
        badge: ['Bestseller', 'Editor Pick', 'Classic', 'Sci-Fi', 'Popular', 'New Arrival', 'Hot', 'Featured'][
          Math.floor(Math.random() * 8)
        ],
        color: ['purple', 'blue', 'green', 'amber', 'pink', 'indigo', 'rose', 'teal', 'violet', 'cyan'][
          Math.floor(Math.random() * 10)
        ],
        seller: ['Riley Store', 'BookHub LK', 'MindBooks', 'SciBooks', 'TechBooks'][
          Math.floor(Math.random() * 5)
        ],
        stock: Math.floor(Math.random() * 20 + 1)
      }));
      setBooks(mapped);
      setTotalItems(data.numFound || mapped.length);
      return mapped;
    };

    setLoading(true);
    setError(null);
    try {
      let q = query;
      if (category && category !== 'All') {
        q = `subject:${category}`;
      }
      const buildUrl = (withKey) => (
        `${BASE}?q=${encodeURIComponent(q)}`
        + `&maxResults=${maxResults}`
        + `&startIndex=${startIndex}`
        + `&orderBy=${orderBy}`
        + `&printType=books`
        + `&langRestrict=en`
        + `${withKey && API_KEY ? `&key=${API_KEY}` : ''}`
      );

      const fetchData = async (withKey) => {
        const res = await fetch(buildUrl(withKey));
        if (!res.ok) {
          throw new Error(`API request failed (${res.status})`);
        }
        return res.json();
      };

      let data;
      try {
        data = await fetchData(true);
      } catch (err) {
        data = await fetchData(false);
      }

      if (!data.items || data.items.length === 0) {
        return await fetchOpenLibrary(q);
      }

      const formatted = data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo?.title || 'Unknown Title',
        author: item.volumeInfo?.authors?.[0] || 'Unknown Author',
        authors: item.volumeInfo?.authors || [],
        description: item.volumeInfo?.description || '',
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail?.replace('http://', 'https://') || null,
        smallThumbnail: item.volumeInfo?.imageLinks?.smallThumbnail?.replace('http://', 'https://') || null,
        rating: item.volumeInfo?.averageRating || (3.5 + Math.random() * 1.5).toFixed(1),
        ratingsCount: item.volumeInfo?.ratingsCount || Math.floor(Math.random() * 5000 + 100),
        pageCount: item.volumeInfo?.pageCount || 0,
        categories: item.volumeInfo?.categories || [],
        publisher: item.volumeInfo?.publisher || '',
        publishedDate: item.volumeInfo?.publishedDate || '',
        language: item.volumeInfo?.language || 'en',
        previewLink: item.volumeInfo?.previewLink || '',
        infoLink: item.volumeInfo?.infoLink || '',
        price: (Math.random() * 20 + 6).toFixed(2),
        originalPrice: (Math.random() * 10 + 18).toFixed(2),
        condition: ['New', 'Like New', 'Good'][Math.floor(Math.random() * 3)],
        badge: ['Bestseller', 'Editor Pick', 'Classic', 'Sci-Fi', 'Popular', 'New Arrival', 'Hot', 'Featured'][
          Math.floor(Math.random() * 8)
        ],
        color: ['purple', 'blue', 'green', 'amber', 'pink', 'indigo', 'rose', 'teal', 'violet', 'cyan'][
          Math.floor(Math.random() * 10)
        ],
        seller: ['Riley Store', 'BookHub LK', 'MindBooks', 'SciBooks', 'TechBooks'][
          Math.floor(Math.random() * 5)
        ],
        stock: Math.floor(Math.random() * 20 + 1)
      }));

      setBooks(formatted);
      setTotalItems(data.totalItems || 0);
      return formatted;
    } catch (err) {
      try {
        return await fetchOpenLibrary(query);
      } catch (fallbackError) {
        setError(fallbackError.message || err.message);
        return [];
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getBookById = useCallback(async (id) => {
    try {
      const res = await fetch(`${BASE}/${id}${API_KEY ? `?key=${API_KEY}` : ''}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  }, []);

  return {
    books,
    loading,
    error,
    totalItems,
    searchBooks,
    getBookById
  };
};
