import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Home from './pages/Home';
import Products from './pages/Products';
import Giveaways from './pages/Giveaways';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import AdditionalDetailsForm from './components/AdditionalDetailsForm';
import AuthForm from './components/AuthForm';

function App() {
  const [session, setSession] = useState(null);
  const [showAdditionalDetailsForm, setShowAdditionalDetailsForm] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar session={session} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/giveaways" element={<Giveaways />} />
          <Route
            path="/profile"
            element={session ? <Profile /> : <AuthForm />}
          />
          <Route path="/auth" element={session ? <Navigate to="/" /> : <AuthForm />} />
        </Routes>
        {showAdditionalDetailsForm && userId && (
          <AdditionalDetailsForm userId={userId} onUpdate={() => setShowAdditionalDetailsForm(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
