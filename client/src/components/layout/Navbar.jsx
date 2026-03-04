import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, LogIn, UserPlus, FileText, Bot, Shield, Home, Target, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-950/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white tracking-tight">Sentri<span className="text-blue-500">FI</span></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/calculators" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
              <FileText size={18} />
              <span>Calculators</span>
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/simulator" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <Target size={18} />
                  <span>Simulator</span>
                </Link>
                <Link to="/financial-twin" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <User size={18} />
                  <span>Twin</span>
                </Link>
                <Link to="/advice" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <FileText size={18} />
                  <span>AI Advice</span>
                </Link>
                <Link to="/tax-agent" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <Bot size={18} />
                  <span>Tax AI Agent</span>
                </Link>
                <Link to="/bot" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <Bot size={18} className="text-green-500" />
                  <span>FinBot</span>
                </Link>
                <Link to="/documents" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <FileText size={18} />
                  <span>Docs</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                    <Shield size={18} />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors flex items-center space-x-2 border border-red-500/20"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center space-x-2"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
