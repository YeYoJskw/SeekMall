import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const { email, password, confirmPassword } = formData;
    if (!email) return 'Email is required';
    if (!password || password.length < 6)
      return 'Password must be at least 6 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    const error = validate();
    if (error) {
      setMessage({ text: error, type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
          const res = await fetch(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include' // если хочешь куки — обязательно добавь
      }
    );

    let data = null;
    try {
      const text = await res.text(); // сначала читаем как текст
      data = text ? JSON.parse(text) : null; // парсим, если не пустой
    } catch (err) {
      console.warn('Failed to parse JSON:', err);
    }

    if (res.ok) {
      setMessage({ text: 'Registration successful!', type: 'success' });
      setFormData({ email: '', password: '', confirmPassword: '' });
    } else {
      setMessage({
        text: (data?.detail || data?.message || 'Registration error'),
        type: 'error',
      });
    }
    } catch (err) {
      setMessage({
        text: 'Network error. Please check your connection.',
        type: 'error',
      });
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
        <h2 className="text-xl sm:text-2xl font-bold text-center">Register</h2>

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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat password"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          value={formData.confirmPassword}
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
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {message.text && (
          <p
            className={`text-sm text-center ${
              message.type === 'error' ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
