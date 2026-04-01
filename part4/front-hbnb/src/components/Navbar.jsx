import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>
          HBnB
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.email}</span>
              <button
                onClick={() => navigate('/places/create')}
                className="btn-primary text-sm"
              >
                + Create Place
              </button>
              <button
                onClick={handleLogout}
                className="btn-primary text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary text-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-secondary text-sm"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
