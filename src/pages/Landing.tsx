import React from 'react';
import SearchBar from '../components/common/SearchBar';
import BookCarousel from '../components/public/BookCarousel';
import AuthorSlider from '../components/public/AuthorSlider';
import CommunitySection from '../components/public/CommunitySection';
import { mockBooks, mockAuthors } from '../data/mockData';
import AboutSection from '../components/public/AboutSection';

const Landing: React.FC = () => {
  const handleSearch = (bookName: string, author: string) => {
    console.log('Searching for:', { bookName, author });
  };

  return (
    <div className="min-h-screen">
      <SearchBar onSearch={handleSearch} />
      <BookCarousel books={mockBooks} />
      <AuthorSlider authors={mockAuthors} />
      <CommunitySection />
      <AboutSection />
    </div>
  );
};

export default Landing;