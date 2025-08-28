import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Settings, Menu, X } from 'lucide-react';
import useAuth from '../../hook/UseAuth';
import Logout from './Logout'; // Import the new Logout component

const Navbar: React.FC = () => {
  const { isLoggedIn, userRole } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to determine active style
  const activeStyle = {
    borderBottom: '2px solid black',
    color: 'black',
  };

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/' || location.pathname === '/login')) {
      navigate('/books', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-black" />
              <span className="text-2xl font-bold text-black">BookHouse</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLoggedIn &&(
            <NavLink 
              to="/" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              style={({ isActive }) => isActive ? activeStyle : undefined}
              end
            >
              Home
            </NavLink>
            )}
            <NavLink 
              to="/books" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              Books
            </NavLink>
            <NavLink 
              to="/authors" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              Authors
            </NavLink>
            <NavLink 
              to="/community" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              Community
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-gray-700 hover:text-black transition-colors font-medium"
              style={({ isActive }) => isActive ? activeStyle : undefined}
            >
              About Us
            </NavLink>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700">Welcome, {userRole}</span>
                {userRole === 'admin' && (
                  <NavLink
                    to="/admin"
                    className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors"
                    style={({ isActive }) => isActive ? activeStyle : undefined}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </NavLink>
                )}
                <Logout variant="full" />
              </>
            ) : (
              <NavLink to="/login" className="btn-primary">
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              style={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/books" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              style={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </NavLink>
            <NavLink 
              to="/authors" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              style={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              Authors
            </NavLink>
            <NavLink 
              to="/community" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              style={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </NavLink>
            <NavLink 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              style={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="px-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-800">Welcome, {userRole}</span>
                </div>
                {userRole === 'admin' && (
                  <NavLink
                    to="/admin"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                    style={({ isActive }) => isActive ? activeStyle : undefined}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </NavLink>
                )}
                <Logout
                  variant="full" 
                  onCloseMenu={() => setIsMenuOpen(false)} 
                />
              </div>
            ) : (
              <div className="px-5">
                <NavLink
                  to="/login"
                  className="block w-full text-center btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;