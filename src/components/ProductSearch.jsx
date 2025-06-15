import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockShops } from '../pages/Home';
import { motion, AnimatePresence } from 'framer-motion';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }

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
  }, [query]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Find a product near you!
      </h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter product name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-blue-500 transition"
        />
      </div>

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
                      <p className="text-sm text-green-600 mt-1">
                        In stock:{' '}
                        <span className="font-medium">
                          {shop.matchedProductName}
                        </span>
                      </p>
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

export default ProductSearch;
