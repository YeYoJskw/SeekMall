import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockShops } from '../pages/Home';
import { motion, AnimatePresence } from 'framer-motion';

const SmartSearch = () => {
  const [mode, setMode] = useState('shop'); // 'shop' or 'product'
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }

    if (mode === 'shop') {
      const filtered = mockShops
        .filter((shop) => shop.name.toLowerCase().includes(q))
        .sort((a, b) => a.distanceKm - b.distanceKm);
      setResults(filtered);
    } else if (mode === 'product') {
      const filtered = mockShops
        .map((shop) => {
          const matchedProduct = shop.products.find(
            (p) => p.name.toLowerCase().includes(q) && p.inStock
          );
          if (matchedProduct) {
            return { ...shop, matchedProductName: matchedProduct.name };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => a.distanceKm - b.distanceKm);
      setResults(filtered);
    }
  }, [query, mode]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Mode switcher */}
      <div className="flex justify-center gap-2 mb-4 mt-10">
        <button
          onClick={() => setMode('shop')}
          className={`px-4 py-2 rounded ${
            mode === 'shop'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Search for shop
        </button>
        <button
          onClick={() => setMode('product')}
          className={`px-4 py-2 rounded ${
            mode === 'product'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Search for product
        </button>
      </div>

      {/* Input field */}
      <input
        type="text"
        placeholder={mode === 'shop' ? 'Enter shop name' : 'Enter product name'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-4"
          >
            {results.map((shop) => (
              <motion.div
                key={shop.id}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={`/store/${shop.id}`}
                  className="block w-full rounded-2xl border-gray-200 shadow-md overflow-hidden bg-white transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {shop.name}
                      </h3>
                      <p className="text-sm text-gray-500">{shop.address}</p>
                      {mode === 'product' && (
                        <p className="text-sm text-green-600 mt-1">
                          In stock:{' '}
                          <span className="font-medium">
                            {shop.matchedProductName}
                          </span>
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-blue-600 font-semibold">
                      ~{shop.distanceKm} km
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {results.length === 0 && query && (
          <motion.p
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 mt-6"
          >
            Nothing found 😕
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearch;
