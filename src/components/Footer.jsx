import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">All rights reserved.</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} SeekMall.</p>
      </div>
    </footer>
  );
};

export default Footer;
