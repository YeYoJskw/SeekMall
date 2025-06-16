import React, { useEffect, useState } from 'react';

const EmailDisplay = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user/email`, {
      method: 'GET',
    //   headers: {
    //     'ngrok-skip-browser-warning': '69420'
    //   },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Ответ не JSON');
        }
        const data = await res.json();
        if (!data.email) {
          throw new Error('В ответе нет поля email');
        }
        setEmail(data.email);
      })
      .catch((err) => {
        console.error('Ошибка запроса:', err);
        setError(err.message);
      });
  }, []);

  if (error) return <h1 style={{ color: 'red' }}>Ошибка: {error}</h1>;

  return <h1>{email || 'Загрузка...'}</h1>;
};

export default EmailDisplay;
