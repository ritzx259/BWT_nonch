import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck, CheckCircle2, Github, Chrome, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, user, demoLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/dashboard');
  };

  const passwordRequirements = [
    { label: 'Minimum 6 characters', met: password.length >= 6 },
    { label: 'Contains uppercase', met: /[A-Z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) }
  ];

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 rounded-[3rem]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-800"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-500/10 text-blue-500 mb-6 shadow-sm border border-blue-500/20">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
            Start your AI financial journey today
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="text-red-500 shrink-0" size={20} />
              <p className="text-sm text-red-400 font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 border border-gray-800 rounded-2xl leading-5 bg-gray-950 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 border border-gray-800 rounded-2xl leading-5 bg-gray-950 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 border border-gray-800 rounded-2xl leading-5 bg-gray-950 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-300 mb-2 ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 border border-gray-800 rounded-2xl leading-5 bg-gray-950 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {password && (
            <div className="bg-gray-800 p-4 rounded-xl space-y-2 border border-gray-700">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password Requirements</p>
              {passwordRequirements.map((req, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className={req.met ? "text-green-500" : "text-gray-600"} />
                  <span className={`text-xs ${req.met ? "text-gray-300 font-medium" : "text-gray-500"}`}>{req.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="text-xs text-gray-500 text-center leading-relaxed font-medium flex flex-col gap-2">
            <div>
              By signing up, you agree to our{' '}
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors font-bold">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors font-bold">Privacy Policy</a>.
            </div>
            <button 
              type="button" 
              onClick={handleDemoLogin}
              className="text-green-500 hover:text-green-400 font-bold uppercase text-[10px] tracking-widest mt-2"
            >
              Skip & Try Demo Login
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-extrabold rounded-2xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center">
                  Create Account <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="relative mt-10">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium uppercase tracking-widest">
            <span className="px-4 bg-gray-900 text-gray-500">Or sign up with</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center py-3 px-4 border border-gray-800 rounded-2xl bg-gray-950 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all shadow-sm">
            <Chrome size={20} className="mr-2 text-red-500" /> Google
          </button>
          <button className="flex items-center justify-center py-3 px-4 border border-gray-800 rounded-2xl bg-gray-950 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:border-gray-700 transition-all shadow-sm">
            <Github size={20} className="mr-2 text-white" /> Github
          </button>
        </div>

        <p className="mt-10 text-center text-sm font-medium text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-extrabold hover:text-blue-400 transition-colors">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
