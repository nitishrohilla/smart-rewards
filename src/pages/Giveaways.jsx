import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Gift } from 'lucide-react';

function Giveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGiveaways() {
      try {
        const { data, error } = await supabase
          .from('giveaways')
          .select('*')
          .order('end_date', { ascending: true });

        if (error) throw error;
        setGiveaways(data || []);
      } catch (error) {
        console.error('Error fetching giveaways:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGiveaways();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Gift className="h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">Active Giveaways</h1>
      </div>

      {giveaways.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Gift className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No Active Giveaways</h3>
          <p className="mt-2 text-sm text-gray-500">Check back later for new giveaways!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {giveaways.map((giveaway) => (
            <div key={giveaway.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{giveaway.title}</h3>
                {giveaway.description && (
                  <p className="mt-2 text-gray-600">{giveaway.description}</p>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-blue-500">
                    <Gift className="h-4 w-4" />
                    <span>{giveaway.coin_cost} coins</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Ends: {new Date(giveaway.end_date).toLocaleDateString()}
                  </div>
                </div>
                <button 
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Enter Giveaway
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Giveaways;
