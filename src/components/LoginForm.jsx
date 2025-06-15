import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (!formData.email || !formData.password) {
      setMessage('All fields are required');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include'
        }
      );

      const text = await res.text(); // сначала читаем как текст

      if (text) {
        const data = JSON.parse(text); // безопасно парсим
        if (res.ok) {
          setMessage('Login successful!');
          setMessageType('success');
          setFormData({ email: '', password: '' });
        } else {
          setMessage(data.detail || data.message || 'Login error');
          setMessageType('error');
        }
      } else {
        // Тело пустое, но статус 200
        if (res.ok) {
          setMessage('Login successful!');
          setMessageType('success');
          setFormData({ email: '', password: '' });
        } else {
          setMessage('Login failed with empty response');
          setMessageType('error');
        }
      }
    } catch (err) {
      setMessage('Network error');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white py-6 sm:py-8 rounded-xl space-y-5"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 rounded font-semibold transition ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <p
            className={`text-sm text-center ${
              messageType === 'success' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
