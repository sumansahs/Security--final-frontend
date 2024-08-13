import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Simulate fetching data with a product that matches the query
    const fetchedResults = [
      { id: 1, name: 'Nike shoes', description: 'Detailed description of Nike shoes', photo: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Adidas shoes', description: 'Detailed description of Adidas shoes', photo: 'https://via.placeholder.com/150' },
    ];

    // Log for debugging
    console.log('Search query:', query);
    console.log('Fetched results:', fetchedResults);

    // Filter results based on the query
    const filteredResults = fetchedResults.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    // Log filtered results for debugging
    console.log('Filtered results:', filteredResults);

    setResults(filteredResults);
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      {results.length === 0 ? (
        <p>No results found for "{query}"</p>
      ) : (
        <ul>
          {results.map((product) => (
            <li key={product.id} style={{ marginBottom: '20px' }}>
              <h2>{product.name}</h2>
              <img src={product.photo} alt={product.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
