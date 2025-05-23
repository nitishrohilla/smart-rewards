import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, Gift, Package, User, Menu, LogIn, UserPlus, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { path: '/', label: 'Daily Coins', icon: Coins },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/giveaways', label: 'Giveaways', icon: Gift },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Smart Rewards
          </Link>

          {/* Hamburger Menu (Mobile & Tablet) */}
          <div className="md:hidden">
            <button onClick={toggleDrawer} className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === path
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
            {!session ? (
              <>
                <Link
                  to="/auth"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Drawer (Mobile & Tablet) */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <div className="flex flex-col h-full p-4">
          <Link to="/" className="text-xl font-bold text-indigo-600 mb-4">
            RewardsApps
          </Link>
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === path
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              } mb-2`}
              onClick={toggleDrawer} // Close drawer on item click
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
          {!session ? (
            <>
              <Link
                to="/auth"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 mb-2"
                onClick={toggleDrawer} // Close drawer on item click
              >
                <LogIn className="w-4 h-4" />
                <span>Auth</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 mb-2"
                onClick={toggleDrawer} // Close drawer on item click
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 mb-2"
                onClick={toggleDrawer} // Close drawer on item click
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && <div className="md:hidden fixed top-0 left-0 h-full w-full bg-black opacity-50 z-40" onClick={toggleDrawer}></div>}
    </nav>
  );
}

export default Navbar;
