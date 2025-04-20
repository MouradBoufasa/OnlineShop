import React from 'react';

const ProductManagement = () => {
  const products = [
    {
      _id: 4564623,
      name: 'shirt',
      price: 110,
      sku: '12154563',
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm-rounded-lg">
        <table className="min-w-full text-center text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 ">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
