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
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-violet-600 dark:from-violet-400 dark:to-violet-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition" onClick={() => navigate('/')}>
          HBnB
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-500 dark:text-gray-400">Logged in as</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{user.email}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-violet-600 dark:from-violet-500 dark:to-violet-700 rounded-full"></div>
              <button
                onClick={() => navigate('/places/create')}
                className="btn-primary text-sm"
              >
                Create Place
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
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
