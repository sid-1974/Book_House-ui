import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '../../types';

interface BookCarouselProps {
  books: Book[];
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [books.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const handleLike = (bookId: string) => {
    console.log('Liked book:', bookId);
  };

  const handleShare = (bookId: string) => {
    console.log('Shared book:', bookId);
  };

  const handleComment = (bookId: string) => {
    console.log('Comment on book:', bookId);
  };

  const handleViewMore = (bookId: string) => {
    console.log('View more for book:', bookId);
  };

  const getVisibleBooks = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % books.length;
      result.push(books[index]);
    }
    return result;
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Books
          </h2>
          <p className="text-lg text-gray-600">
            Discover amazing books curated just for you
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getVisibleBooks().map((book, index) => (
              <div
                key={`${book.id}-${index}`}
                className="transform transition-all duration-500 hover:scale-105"
              >
                <BookCard
                  book={book}
                  onLike={handleLike}
                  onShare={handleShare}
                  onComment={handleComment}
                  onViewMore={handleViewMore}
                />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
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

        {/* Carousel indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {books.map((_, index) => (
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

export default BookCarousel;