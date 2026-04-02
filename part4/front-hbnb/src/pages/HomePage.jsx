import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-red-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to HBnB</h1>
          <p className="text-xl mb-8">Discover amazing places to stay around the world</p>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => navigate('/places')}
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition"
            >
              Browse Places
            </button>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-5xl mb-4 text-primary font-bold">▦</div>
            <h3 className="font-bold text-xl mb-2">Find Places</h3>
            <p className="text-gray-600">Browse thousands of places to stay in your favorite destinations</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4 text-amber-500 font-bold">◆</div>
            <h3 className="font-bold text-xl mb-2">Read Reviews</h3>
            <p className="text-gray-600">See honest reviews from guests who stayed at each place</p>
          </div>
          <div className="p-6">
            <div className="text-5xl mb-4 text-green-600 font-bold">✓</div>
            <h3 className="font-bold text-xl mb-2">Leave Reviews</h3>
            <p className="text-gray-600">Share your experience and help other travelers decide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
