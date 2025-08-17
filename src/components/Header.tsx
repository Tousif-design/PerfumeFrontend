import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Menu, X, Crown, Award, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsOpaque(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced login check function - Fixed to persist admin status
  const checkLoginStatus = () => {
    try {
      // Check for various auth indicators from localStorage AND sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const adminAuth = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
      const isAdminFlag = localStorage.getItem('isAdmin') || sessionStorage.getItem('isAdmin');
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      // Check if any auth token exists
      const hasAuth = !!(token || adminAuth || adminToken || authToken);
      
      // Enhanced admin status check from multiple sources
      let adminStatus = false;
      
      // Check adminAuth JSON
      if (adminAuth) {
        try {
          const parsedAuth = JSON.parse(adminAuth);
          if (parsedAuth && parsedAuth.isAdmin === true) {
            adminStatus = true;
          }
        } catch (e) {
          console.error('Error parsing admin auth:', e);
        }
      }
      
      // Check other admin indicators
      if (!adminStatus) {
        adminStatus = (
          isAdminFlag === 'true' || 
          userRole === 'admin' || 
          !!adminToken || 
          (token && isAdminFlag === 'true')
        );
      }
      
      console.log('Login check:', { 
        hasAuth, 
        adminStatus, 
        token: !!token, 
        adminAuth: !!adminAuth, 
        isAdminFlag, 
        userRole 
      });
      
      return { loggedIn: hasAuth, isAdmin: adminStatus };
    } catch (error) {
      console.error('Error checking login status:', error);
      return { loggedIn: false, isAdmin: false };
    }
  };

  // Check login status on component mount and set up listeners
  useEffect(() => {
    const updateLoginStatus = () => {
      const { loggedIn, isAdmin: adminStatus } = checkLoginStatus();
      console.log('Updating login status:', { loggedIn, adminStatus });
      setUserLoggedIn(loggedIn);
      setIsAdmin(adminStatus);
    };

    // Initial check
    updateLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab or same tab)
    const handleStorageChange = (e) => {
      const authKeys = ['token', 'adminAuth', 'isAdmin', 'adminToken', 'userRole', 'authToken'];
      if (authKeys.includes(e.key)) {
        console.log('Storage changed:', e.key, e.newValue);
        updateLoginStatus();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleAuthChange = () => {
      console.log('Auth change event detected');
      updateLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChanged', handleAuthChange);

    // Also check periodically to catch any changes (more reliable)
    const interval = setInterval(updateLoginStatus, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChanged', handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  // Enhanced logout function - Fixed to clear all admin data and prevent auto-logout
  const handleLogout = () => {
    try {
      console.log('Logout initiated');
      
      // Clear all possible storage locations
      const keysToRemove = [
        'token',
        'adminAuth', 
        'isAdmin',
        'adminToken',
        'userRole',
        'authToken',
        'user',
        'userData'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      
      // Update state immediately
      setUserLoggedIn(false);
      setIsAdmin(false);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new Event('authChanged'));
      
      console.log('Logout completed, redirecting...');
      
      // Navigate to login page
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback navigation
      window.location.href = '/login';
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500
        ${isOpaque ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-base font-medium text-yellow-800">Al Wajhi Oudh</h1>
              <div className="flex items-center gap-1">
                <p className="text-[8px] sm:text-[10px] text-gray-600 tracking-wider uppercase">Premium Perfumery</p>
                <p className="text-[8px] sm:text-[10px] text-yellow-600">Est. 1985</p>
              </div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Home', 'Collection', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-amber-900 hover:text-amber-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {userLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* Admin Badge */}
                {isAdmin && (
                  <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-sm">
                    <Crown className="w-3 h-3" />
                    <span>Admin</span>
                  </div>
                )}
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium shadow-md hover:bg-red-600 transition-all flex items-center gap-1 hover:scale-105"
                >
                  <LogOut className="w-4 h-4" /> 
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-medium shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all hover:scale-105"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" /> : 
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-4">
              {['Home', 'Collection', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-base font-medium text-amber-900 hover:text-amber-600 transition-colors py-2 border-b border-amber-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              {/* Mobile Admin Status */}
              {userLoggedIn && isAdmin && (
                <div className="flex items-center gap-2 py-2 border-b border-amber-100">
                  <Crown className="w-4 h-4 text-purple-600" />
                  <span className="text-base font-medium text-purple-600">Admin Account</span>
                </div>
              )}
              
              {userLoggedIn ? (
                <button
                  onClick={() => { 
                    handleLogout(); 
                    setIsMenuOpen(false); 
                  }}
                  className="text-base font-medium text-red-600 hover:text-red-800 transition-colors py-2 border-b border-amber-100 text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-base font-medium text-amber-900 hover:text-amber-600 transition-colors py-2 border-b border-amber-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;