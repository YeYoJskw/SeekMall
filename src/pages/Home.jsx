import React from 'react';
import SearchBar from '../components/SearchBar';
import StoreCard from '../components/StoreCard';
import { useState, useMemo } from 'react';
import ProductSearch from '../components/ProductSearch';
import SmartSearch from '../components/SmartSearch';

export const mockShops = [
  {
    id: '1',
    name: 'TechZone',
    description: 'Electronics and gadgets store',
    address: 'Bishkek, Kievskaya St. 34',
    lat: 42.8746,
    lng: 74.6122,
    distanceKm: 0.5,
    phoneNumber: '+996 707 123 456',
    category: 'Electronics',
    email: 'info@techzone.kg',
    imageUrl:
      '/images/TechZone_lanza_solucion_Smart_Home_en_Expo_Seguridad.jpg',
    products: [
      {
        id: 't-p1',
        name: 'iPhone 14',
        description: 'Smartphone Apple',
        price: 85000,
        stock: 5,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 't-p2',
        name: 'MacBook Air',
        description: 'Laptop Apple M2',
        price: 120000,
        stock: 3,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 't-p3',
        name: 'AirPods Pro',
        description: 'Wireless earbuds',
        price: 25000,
        stock: 2,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
    ],
    reviews: [
      {
        id: 'r1',
        content: 'Great selection of tech!',
        rating: 5,
        appUserId: 'user001',
        createdAt: '2025-06-15T10:00:00Z',
      },
    ],
  },
  {
    id: '2',
    name: 'FoodMart',
    description: 'Supermarket with groceries and household goods',
    address: 'Bishkek, Moskovskaya St. 12',
    lat: 42.8701,
    lng: 74.5992,
    distanceKm: 2.3,
    phoneNumber: '+996 777 456 789',
    category: 'Groceries',
    email: 'support@foodmart.kg',
    imageUrl: '/images/images.png',
    products: [
      {
        id: 'f-p1',
        name: 'Milk',
        description: '1L bottle',
        price: 50,
        stock: 10,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 'f-p2',
        name: 'Bread',
        description: 'Fresh baked',
        price: 30,
        stock: 0,
        inStock: false,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 'f-p3',
        name: 'Apple Juice',
        description: 'Organic juice',
        price: 80,
        stock: 5,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
    ],
    reviews: [
      {
        id: 'r2',
        content: 'Fresh products, fast service.',
        rating: 4,
        appUserId: 'user002',
        createdAt: '2025-06-14T08:30:00Z',
      },
    ],
  },
  {
    id: '3',
    name: 'BookWorld',
    description: 'Bookstore with a wide selection of literature',
    address: 'Bishkek, Isanova St. 20',
    lat: 42.8798,
    lng: 74.602,
    distanceKm: 3.0,
    phoneNumber: '+996 500 111 222',
    category: 'Books',
    email: 'contact@bookworld.kg',
    imageUrl: '/images/images (1).png',
    products: [
      {
        id: 'b-p1',
        name: '1984',
        description: 'George Orwell',
        price: 450,
        stock: 8,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 'b-p2',
        name: 'Atomic Habits',
        description: 'James Clear',
        price: 550,
        stock: 6,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
    ],
    reviews: [
      {
        id: 'r3',
        content: 'Very cozy, lots of classics.',
        rating: 5,
        appUserId: 'user003',
        createdAt: '2025-06-13T14:15:00Z',
      },
    ],
  },
  {
    id: '4',
    name: 'FashionLine',
    description: 'Fashion clothing and accessories store',
    address: 'Bishkek, Baitik Baatyra St. 78',
    lat: 42.869,
    lng: 74.6201,
    distanceKm: 4.2,
    phoneNumber: '+996 550 888 333',
    category: 'Clothing',
    email: 'hello@fashionline.kg',
    imageUrl: '/images/images (2).png',
    products: [
      {
        id: 'fash-p1',
        name: 'Denim Jacket',
        description: 'Unisex, blue',
        price: 7000,
        stock: 0,
        inStock: false,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 'fash-p2',
        name: 'Sneakers',
        description: 'White running shoes',
        price: 8500,
        stock: 2,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
    ],
    reviews: [
      {
        id: 'r4',
        content: 'Stylish, but prices are high.',
        rating: 3,
        appUserId: 'user004',
        createdAt: '2025-06-12T16:45:00Z',
      },
    ],
  },
  {
    id: '5',
    name: 'GreenGarden',
    description: 'Everything for garden and yard',
    address: 'Bishkek, Frunze St. 99',
    lat: 42.8763,
    lng: 74.595,
    distanceKm: 5.8,
    phoneNumber: '+996 701 234 567',
    category: 'Household goods',
    email: 'sales@greengarden.kg',
    imageUrl: '/images/images.jpg',
    products: [
      {
        id: 'g-p1',
        name: 'Lawn Mower',
        description: 'Electric mower',
        price: 25000,
        stock: 1,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
      {
        id: 'g-p2',
        name: 'Shovel',
        description: 'Metal shovel',
        price: 1200,
        stock: 5,
        inStock: true,
        imageUrl: '/images/product.png',
        reviews: [],
      },
    ],
    reviews: [
      {
        id: 'r5',
        content: 'Found everything for my dacha!',
        rating: 4,
        appUserId: 'user005',
        createdAt: '2025-06-11T09:20:00Z',
      },
    ],
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = mockShops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase() === searchQuery.toLowerCase()
  );

  const categories = useMemo(() => {
    const unique = Array.from(new Set(mockShops.map((shop) => shop.category)));
    return ['All', ...unique];
  }, []);

  return (
    <div>
      <SmartSearch />
      <div className="max-w-6xl mx-auto px-4 py-0">
        <div className="flex gap-4 mb-4 overflow-x-auto">
          {categories.map((cat, idx) => {
            const isSelected =
              (cat === 'All' && searchQuery === '') ||
              searchQuery.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                className={`px-4 py-2 rounded whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSearchQuery(cat === 'All' ? '' : cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Shops</h2>
        <div className="w-full flex flex-col gap-8">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => <StoreCard key={shop.id} {...shop} />)
          ) : (
            <p>No shops found for your query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
