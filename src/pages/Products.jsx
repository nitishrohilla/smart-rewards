import React from 'react';

const Products = () => {
  // Dummy product data
  const products = [
    { id: 1, name: 'Product 1', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 30, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 40, imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 50, imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Product 5', price: 60, imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Product 6', price: 70, imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
