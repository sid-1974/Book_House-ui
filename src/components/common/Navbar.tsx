import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-black" />
            <span className="text-2xl font-bold text-black">BookHouse</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/books" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Books
            </Link>
            <Link 
              to="/authors" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Authors
            </Link>
            <Link 
              to="/community" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Community
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              About Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.username}</span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 btn-secondary"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;