import React, { useEffect, useState } from 'react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: '120121',
          createdAt: new Date(),
          shippingAddress: { city: 'new york', country: 'USA' },
          orderItems: [
            {
              name: 'product 1',
              image: 'https://picsum.photos/500/500?random=1',
            },
          ],
          orderIsPaid: true,
        },
        {
          _id: '120126',
          createdAt: new Date(),
          shippingAddress: { city: 'new york', country: 'USA' },
          orderItems: [
            {
              name: 'product 5',
              image: 'https://picsum.photos/500/500?random=63',
            },
            {
              name: 'product 2',
              image: 'https://picsum.photos/500/500?random=31',
            },
          ],
          orderIsPaid: false,
        },
        {
          _id: '120191',
          createdAt: new Date(),
          shippingAddress: { city: 'new york', country: 'USA' },
          orderItems: [
            {
              name: 'product 7',
              image: 'https://picsum.photos/500/500?random=41',
            },
            {
              name: 'product 15',
              image: 'https://picsum.photos/500/500?random=14',
            },
            {
              name: 'product 60',
              image: 'https://picsum.photos/500/500?random=15',
            },
          ],
          orderIsPaid: true,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-l overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order Id</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4 font-semibold text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()} {'   '}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold">
                    ${' 220'}
                  </td>
                  <td
                    className={`px-2 py-1 font-medium rounded-full text-center  ${
                      order.orderIsPaid
                        ? 'bg-green-500 text-gray-100'
                        : 'bg-amber-500 text-gray-200'
                    }`}
                  >
                    {order.orderIsPaid ? 'PAID' : 'PENDING'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
