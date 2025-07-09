import React from 'react';
import CommunitySection from '../components/public/CommunitySection';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Community
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with fellow book lovers, share reviews, and discover your next great read
          </p>
        </div>
        <CommunitySection />
      </div>
    </div>
  );
};

export default Community;