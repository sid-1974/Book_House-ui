import React from 'react';
import { Heart, Share2, MessageCircle, Star } from 'lucide-react';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onLike: (bookId: string) => void;
  onShare: (bookId: string) => void;
  onComment: (bookId: string) => void;
  onViewMore: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onLike,
  onShare,
  onComment,
  onViewMore
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{book.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-1">by {book.author}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onViewMore(book.id)}
            className="btn-primary text-sm"
          >
            View More
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onLike(book.id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Like"
            >
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
            <button
              onClick={() => onShare(book.id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Share"
            >
              <Share2 className="h-5 w-5 text-gray-600 hover:text-blue-500 transition-colors" />
            </button>
            <button
              onClick={() => onComment(book.id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Comment"
            >
              <MessageCircle className="h-5 w-5 text-gray-600 hover:text-green-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;