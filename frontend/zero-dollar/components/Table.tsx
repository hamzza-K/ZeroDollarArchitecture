'use client'
import { useEffect, useState } from 'react';

interface QuoteData {
  date: string;
  author: string;
  quote: string;
  formatted_date: string;
}

const Table = () => {
  const [quoteData, setQuoteData] = useState<QuoteData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetch-quotes');

        if (response.ok) {
          const data: QuoteData[] = await response.json();
          setQuoteData(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Author</th>
          <th className="border p-2">Quote</th>
        </tr>
      </thead>
      <tbody>
        {quoteData.map((quote, index) => (
          <tr key={quote.date}>
            <td className={`border p-2 ${index !== quoteData.length - 1 ? 'border-b' : ''}`}>{quote.formatted_date}</td>
            <td className={`border p-2 ${index !== quoteData.length - 1 ? 'border-b' : ''}`}>{quote.author}</td>
            <td className={`border p-2 ${index !== quoteData.length - 1 ? 'border-b' : ''}`}>{quote.quote}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;