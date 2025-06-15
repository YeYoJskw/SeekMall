import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StorePage from './pages/StorePage';
import AddStore from './pages/AddStore';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <main className="mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/addStoreForm" element={<AddStore />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
