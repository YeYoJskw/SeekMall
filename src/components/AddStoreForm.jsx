import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStoreForm = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess(true);

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Store</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
          Store added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter store name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder='Enter store address, e.g. "Bishkek, Lenin St. 12"'
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter store email, e.g. example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder='Enter store phone number, e.g. "+996 123 456 789"'
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Category
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder='Enter store category, e.g. "Electronics"'
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Store Description
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter store description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg p-2 bg-white"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Add Store
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStoreForm;
