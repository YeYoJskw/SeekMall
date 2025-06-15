import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md">
        <header className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900 cursor-pointer select-none">
              SeekMall
            </h1>
          </Link>

          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-6 text-lg font-medium">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/addStoreByCodeForm"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  + Add Store By Code
                </Link>
              </li>
              <li>
                <Link
                  to="/addStoreForm"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  + Add Store
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </button>
              </li>
            </ul>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-6 pb-4 overflow-hidden"
            >
              <ul className="space-y-3 text-base font-medium">
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addStoreForm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    + Add Store
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsRegisterOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isRegisterOpen && (
          <motion.div
            className="fixed inset-0 shadow-2xl bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRegisterOpen(false)}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-xl p-4 relative shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setIsRegisterOpen(false)}
              >
                &#10005;
              </button>
              <RegisterForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            className="fixed inset-0  bg-opacity-0 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-xl p-4 relative shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setIsLoginOpen(false)}
              >
                &#10005;
              </button>
              <LoginForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
