import React from 'react';
import AuthorSlider from '../components/public/AuthorSlider';
import { mockAuthors } from '../data/mockData';

const Authors: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Authors
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the brilliant minds behind your favorite books and explore their literary journeys
          </p>
        </div>
        <AuthorSlider authors={mockAuthors} />
      </div>
    </div>
  );
};

export default Authors;