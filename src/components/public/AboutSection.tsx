import React from 'react';
import { BookOpen, Users, Star, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  const stats = [
    {
      icon: BookOpen,
      number: '10,000+',
      label: 'Books in Library',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      number: '50,000+',
      label: 'Active Readers',
      color: 'text-green-600'
    },
    {
      icon: Star,
      number: '100,000+',
      label: 'Book Reviews',
      color: 'text-yellow-600'
    },
    {
      icon: Award,
      number: '500+',
      label: 'Featured Authors',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About BookHouse
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your ultimate destination for discovering, sharing, and discussing books with a passionate community of readers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At BookHouse, we believe that books have the power to transform lives, spark imagination, 
              and connect people across cultures and generations. Our mission is to create a vibrant 
              community where book lovers can discover their next favorite read, share their thoughts, 
              and connect with fellow readers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're looking for the latest bestseller, a hidden gem, or want to explore 
              reviews from our passionate community, BookHouse is your gateway to the wonderful 
              world of literature.
            </p>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Books and reading"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Growing Community
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with thousands of book lovers, discover new authors, and share your reading journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/community" className="btn-primary">
                Get Started Today
              </a>
              <a href="/books" className="btn-secondary">
                Explore Books
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;