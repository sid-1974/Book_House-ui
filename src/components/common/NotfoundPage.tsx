import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Animated GIF */}
        <div className="mb-8 flex justify-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{
              width: '300px',
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <source src="/assets/Book.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Content */}
        <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">PAGE NOT FOUND</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 hover:shadow-lg"
        >
          {isHovered ? (
            <ArrowLeft className="mr-2 h-5 w-5" />
          ) : (
            <Home className="mr-2 h-5 w-5" />
          )}
          Go Back Home
        </button>
        
        {/* Additional helpful links */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? <a href="/contact" className="font-medium text-black hover:text-gray-500">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;