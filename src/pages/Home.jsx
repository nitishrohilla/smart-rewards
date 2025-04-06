import React from 'react';
import { Coins, Gift, Package, Users } from 'lucide-react';

function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Rewards Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Coins className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Earn Coins</h2>
          </div>
          <p className="text-gray-600">Complete tasks and refer friends to earn coins that you can spend on products or giveaway entries.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Shop Products</h2>
          </div>
          <p className="text-gray-600">Browse our selection of exclusive products and redeem them with your earned coins.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Gift className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Enter Giveaways</h2>
          </div>
          <p className="text-gray-600">Use your coins to enter exciting giveaways and win amazing prizes.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Refer Friends</h2>
          </div>
          <p className="text-gray-600">Invite your friends to join and earn bonus coins when they sign up using your referral link.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
