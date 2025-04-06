import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdditionalDetailsForm from '../components/AdditionalDetailsForm';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(profileData);
        }
      }
      setLoading(false);
    };

    getProfile();
  }, []);

  const handleProfileUpdate = async () => {
    // Refresh profile after update
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    setProfile(profileData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>First Name: {profile.first_name}</p>
          <p>Last Name: {profile.last_name}</p>
          <p>Phone Number: {profile.phone_number}</p>
          <p>Username: {profile.username}</p>
          <p>Country: {profile.country}</p>
        </div>
      ) : user ? (
        <AdditionalDetailsForm userId={user.id} onUpdate={handleProfileUpdate} />
      ) : (
        <p>Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
