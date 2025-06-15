import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockShops } from './Home';

const StorePage = () => {
  const { id } = useParams();
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const store = mockShops.find((shop) => shop.id === id);

  if (!store) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500">
        Store not found 😢
      </div>
    );
  }

  const [reviews, setReviews] = useState(store.reviews || []);

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const [newReviewUser, setNewReviewUser] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!newReviewUser.trim() || !newReviewContent.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    if (newReviewRating < 1 || newReviewRating > 5) {
      alert('Rating must be from 1 to 5.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      appUserId: newReviewUser.trim(),
      rating: newReviewRating,
      content: newReviewContent.trim(),
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setNewReviewUser('');
    setNewReviewRating(5);
    setNewReviewContent('');
    setIsReviewFormVisible(false);
  };

  const filteredProducts = store.products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchProductQuery.toLowerCase());

    const matchesStock = showOnlyInStock ? product.stock > 0 : true;

    return matchesSearch && matchesStock;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
        {store.name}
      </h1>
      <p className="text-lg text-gray-700 mb-5">{store.description}</p>
      <p className="text-gray-500 text-sm mb-8 flex flex-wrap gap-4">
        <span>📍 {store.address}</span>
        <span>☎ {store.phoneNumber}</span>
        <span>✉ {store.email}</span>
      </p>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Products</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchProductQuery}
            onChange={(e) => setSearchProductQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 mb-4 sm:mb-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <label className="inline-flex items-center cursor-pointer select-none">
            <span
              className={`mr-3 font-semibold transition-colors duration-300 ${
                !showOnlyInStock ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              All products
            </span>

            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showOnlyInStock}
                onChange={() => setShowOnlyInStock((prev) => !prev)}
              />
              <div
                className="w-14 h-8 bg-gray-300 rounded-full peer-focus:ring-blue-300
                    peer-checked:bg-blue-600 transition-colors duration-300"
              ></div>
              <div
                className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow
                    peer-checked:translate-x-6 transition-transform duration-300"
              ></div>
            </div>

            <span
              className={`ml-3 font-semibold transition-colors duration-300 ${
                showOnlyInStock ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              In stock only
            </span>
          </label>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 flex-grow mt-1">
                    {product.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-blue-600 font-bold text-lg">
                      {product.price} KGS
                    </p>
                    <p className="text-sm text-gray-500">
                      In stock: {product.stock}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            No products found for your query.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Reviews</h2>

        {!isReviewFormVisible ? (
          <button
            onClick={() => setIsReviewFormVisible(true)}
            className="mb-8 bg-blue-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Add review
          </button>
        ) : (
          <form
            onSubmit={handleAddReview}
            className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md max-w-xl"
          >
            <h3 className="text-xl font-semibold mb-4">Add a review</h3>

            <label className="block mb-3">
              <span className="block text-gray-700 font-medium mb-1">
                Your name
              </span>
              <input
                type="text"
                value={newReviewUser}
                onChange={(e) => setNewReviewUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter your name"
                required
              />
            </label>

            <label className="block mb-3">
              <span className="block text-gray-700 font-medium mb-1">
                Rating
              </span>
              <select
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} ⭐
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-4">
              <span className="block text-gray-700 font-medium mb-1">
                Review
              </span>
              <textarea
                value={newReviewContent}
                onChange={(e) => setNewReviewContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Write your review..."
                rows={4}
                required
              />
            </label>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsReviewFormVisible(false)}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#a8a8a834] relative rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.appUserId}
                    </span>
                    <div className="text-yellow-500 font-bold text-sm">
                      {'⭐'.repeat(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{review.content}"</p>
                </div>
                <p className="text-xs text-gray-400 absolute bottom-5 right-5  sm:mt-0">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>
    </div>
  );
};

export default StorePage;
