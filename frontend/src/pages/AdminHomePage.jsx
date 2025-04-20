import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
  const orders = [
    {
      _id: 321515,
      user: {
        name: 'John doe',
      },
      totalPrice: 110,
      status: 'Processing',
    },
    {
      _id: 321515,
      user: {
        name: 'John doe',
      },
      totalPrice: 110,
      status: 'Processing',
    },
    {
      _id: 321515,
      user: {
        name: 'John doe',
      },
      totalPrice: 110,
      status: 'Processing',
    },
    {
      _id: 321515,
      user: {
        name: 'John doe',
      },
      totalPrice: 110,
      status: 'Processing',
    },
    {
      _id: 321515,
      user: {
        name: 'John doe',
      },
      totalPrice: 110,
      status: 'Processing',
    },
    {
      _id: 321515,
      user: {
        name: 'John doe',
      },
      totalPrice: 110,
      status: 'Processing',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 gap-8">
        <div className="p-4 shadow-md rounded-lg space-y-3">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$100000</p>
        </div>
        <div className="p-4 shadow-md rounded-lg space-y-3">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">653</p>
          <Link to="/admin/orders" className="text-blue-400 hover:underline">
            Manage orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg space-y-3">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl">120</p>
          <Link to="/admin/products" className="text-blue-400 hover:underline">
            Manage products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center text-gray-600">
            <thead className="bg-gray-300 text-sm uppercase text-gray-600">
              <tr>
                <th className="py-3  px-4 ">Order ID</th>
                <th className="py-3  px-4 ">User</th>
                <th className="py-3  px-4 ">total price</th>
                <th className="py-3  px-4 ">status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                  >
                    <th className="p-4"># {order._id}</th>
                    <th className="p-4">{order.user.name}</th>
                    <th className="p-4">{order.totalPrice}</th>
                    <th className="p-4">{order.status}</th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center  text-gray-500">
                    No recent orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
