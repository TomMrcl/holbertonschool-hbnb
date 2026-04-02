import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-500 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Discover Your Next Perfect Stay
          </h1>
          <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
            Explore thousands of unique places around the world. Find your ideal accommodation, read honest reviews, and book with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-violet-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-violet-50 transition shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-violet-600 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/places')}
                className="bg-white text-violet-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-violet-50 transition shadow-lg hover:shadow-xl"
              >
                Browse Places
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-violet-400 mb-2">5000+</div>
              <p className="text-gray-300 text-lg">Amazing Places</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-violet-400 mb-2">50000+</div>
              <p className="text-gray-300 text-lg">Genuine Reviews</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-violet-400 mb-2">500+</div>
              <p className="text-gray-300 text-lg">Cities Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose HBnB?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-violet-900 to-violet-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition duration-300 border border-violet-700">
              <div className="w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-white text-center">Easy Discovery</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Browse thousands of unique places with advanced filters and search. Find exactly what you're looking for in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition duration-300 border border-amber-700">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-white text-center">Trusted Reviews</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Read verified reviews from real guests. Make informed decisions based on honest feedback from travelers like you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition duration-300 border border-green-700">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-white text-center">Your Voice Matters</h3>
              <p className="text-gray-300 text-center leading-relaxed">
                Share your experience and help other travelers. Your reviews help property owners improve and guide future guests.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-800 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Browse', desc: 'Explore thousands of places' },
              { num: 2, title: 'Compare', desc: 'Read reviews and details' },
              { num: 3, title: 'Book', desc: 'Secure your reservation' },
              { num: 4, title: 'Share', desc: 'Leave your honest review' }
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-white shadow-lg">
                  {step.num}
                </div>
                <h4 className="font-bold text-xl text-white mb-2">{step.title}</h4>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-violet-600 to-violet-500 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Explore?</h2>
          <p className="text-violet-100 text-lg mb-8">
            Start your journey today and discover amazing places at incredible prices.
          </p>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-violet-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-violet-50 transition shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </button>
          ) : (
            <button
              onClick={() => navigate('/places')}
              className="bg-white text-violet-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-violet-50 transition shadow-lg hover:shadow-xl"
            >
              Start Exploring
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-12 px-4 text-center text-gray-500">
        <p>© 2024 HBnB. All rights reserved. Your next adventure awaits.</p>
      </div>
    </div>
  );
}
