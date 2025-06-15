import React from 'react';
import { Link } from 'react-router-dom';

const StoreCard = ({
  id,
  name,
  description,
  rating,
  address,
  phoneNumber,
  imageUrl,
}) => {
  return (
    <Link
      to={`/store/${id}`}
      className="block w-full rounded-2xl border-gray-200 shadow-md overflow-hidden bg-white transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:h-[200px] h-auto">
        {/* Image */}
        <div className="w-full md:w-2/5 h-48 md:h-full border-b-2 md:border-b-0 md:border-r-2 border-gray-200 overflow-hidden bg-white flex items-center justify-center">
          <img
            src={imageUrl || '/images/default-store.png'}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-3/5 p-4 flex flex-col justify-between bg-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {name}
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-prose">
                {description}
              </p>
            </div>

            <div className="flex items-center space-x-1 text-yellow-500 text-base md:text-lg">
              <span>★</span>
              <span>{rating ?? '—'}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            <div>{address}</div>
            <div>{phoneNumber}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
