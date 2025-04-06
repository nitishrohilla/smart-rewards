import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Coins, Gift, Package, Users } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Giveaways from './pages/Giveaways.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1>Hello World</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/giveaways" element={<Giveaways />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
