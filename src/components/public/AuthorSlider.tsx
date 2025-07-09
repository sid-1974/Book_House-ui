import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AuthorCard from './AuthorCard';
import { Author } from '../../types';

interface AuthorSliderProps {
  authors: Author[];
}

const AuthorSlider: React.FC<AuthorSliderProps> = ({ authors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % authors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [authors.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % authors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + authors.length) % authors.length);
  };

  const getVisibleAuthors = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % authors.length;
      result.push(authors[index]);
    }
    return result;
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Famous Authors
          </h2>
          <p className="text-lg text-gray-600">
            Meet the brilliant minds behind your favorite books
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleAuthors().map((author, index) => (
              <div
                key={`${author.id}-${index}`}
                className="transform transition-all duration-500"
              >
                <AuthorCard author={author} />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {authors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorSlider;