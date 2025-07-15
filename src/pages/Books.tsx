import React from 'react';
import SearchBar from '../components/common/SearchBar';
import BookCarousel from '../components/public/BookCarousel';
import { mockBooks} from '../data/mockData';

const Books: React.FC = () => {
  const handleSearch = (bookName: string, author: string) => {
    console.log('Searching for:', { bookName, author });
  };

  return (
    <div className="min-h-screen">
      <SearchBar onSearch={handleSearch} />
      <BookCarousel books={mockBooks} />  
    </div>
  );
};

export default Books;