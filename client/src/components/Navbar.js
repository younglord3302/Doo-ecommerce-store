import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-500">
      <div className="container mx-auto">
        <div className="glass px-6 py-3 rounded-2xl flex justify-between items-center transition-all duration-500 hover:shadow-accent-indigo/10 shadow-2xl">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
            <span className="text-gradient">DOO</span>
          </Link>
          
          <div className="flex-1 max-w-sm mx-8 hidden md:block">
             <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Explore masterpieces..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-10 text-sm focus:ring-1 focus:ring-accent-indigo/50 outline-none transition-all group-hover:bg-white/10"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-accent-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8 text-sm font-medium">
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors relative group">
              Collection
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-indigo transition-all group-hover:w-full"></span>
            </Link>

            {user ? (
              <>
                <Link to="/cart" className="text-gray-300 hover:text-white relative p-1 transition-colors">
                  <svg className="w-6 h-6 outline-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cart?.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-rose text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                      {cart.totalItems}
                    </span>
                  )}
                </Link>

                {isAdmin && (
                  <Link to="/admin" className="text-accent-rose font-bold hover:opacity-80">
                    Studio
                  </Link>
                )}

                <div className="group relative">
                  <button className="flex items-center space-x-2 outline-none">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-indigo to-accent-cyan p-0.5">
                      <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-xs font-bold font-mono text-white">
                         {user.name?.[0].toUpperCase() || 'U'}
                      </div>
                    </div>
                  </button>
                  <div className="absolute top-full right-0 mt-3 w-48 glass rounded-xl overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 origin-top-right">
                    <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                      <p className="text-xs text-gray-400 font-sans">Account</p>
                      <p className="text-sm font-bold truncate">{user.name}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10">My Orders</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-accent-rose hover:bg-white/10 border-t border-white/5">Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-glow">
                  Join Studio
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
