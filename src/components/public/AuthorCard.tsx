import React from 'react';
import { BookOpen } from 'lucide-react';
import { Author } from '../../types';

interface AuthorCardProps {
  author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={author.image}
          alt={author.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm">{author.booksCount} Books</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {author.name}
        </h3>
        <p className="text-gray-700 line-clamp-3">
          {author.description}
        </p>
        <button className="mt-4 btn-secondary text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default AuthorCard;