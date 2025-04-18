import React from 'react';

const checkout = {
  _id: '12313215',
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: '1',
      name: 'jacket',
      color: 'Black',
      size: 'M',
      price: 150,
      quantity: 1,
      image: 'https://picsum.photos/150?random=1',
    },
    {
      productId: '4',
      name: 'sweet',
      color: 'Black',
      size: 'S',
      price: 120,
      quantity: 1,
      image: 'https://picsum.photos/150?random=2',
    },
    {
      productId: '6',
      name: 'pant',
      color: 'Black',
      size: 'XL',
      price: 90,
      quantity: 2,
      image: 'https://picsum.photos/150?random=4',
    },
  ],
  shippingAddress: {
    address: 'Rue zedmia  rachid N°5',
    city: 'Blida',
    country: 'Algeria',
  },
};

const calculateEstimatedDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10);
  return orderDate.toLocaleDateString();
};

const OrderConfirmationPage = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-emerald-600 py-6">
        Thank you for your order !
      </h1>
      <div className="max-w-2xl h-full mx-auto bg-gray-50 rounded-xl m-4">
        {checkout && (
          <div className="p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between mb-20">
              {/* Order id and date */}
              <div className="">
                <h2 className="text-xl font-semibold">
                  Order ID:{checkout._id}
                </h2>
                <p className="text-gray-400">
                  Order date :{' '}
                  {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Estimated Delivery */}
              <div>
                <p className="text-emerald-700 text-sm">
                  Estimated Delivery :{' '}
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>
            {/* Ordered Items */}
            <div className="mb-20">
              {checkout.checkoutItems.map((item) => (
                <div key={item.productId} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="">
                    <h4 className="text-md font-semibold text-gray-700">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div className="ml-auto text-right ">
                    <p className="text-md font-semibold text-gray-600">
                      $ {item.price}
                    </p>
                    <p className="text-md font-semibold text-gray-600">
                      Quantity {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Payment and delivery info */}
            <div className="grid grid-cols-2 gap-8">
              {/* Payment info */}
              <div>
                <h4 className="text-lg font-semibold  mb-2">Payment</h4>
                <p className="text-gray-600">Paypal</p>
              </div>
              {/* Delivery info */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                <p className="text-gray-600">
                  {checkout.shippingAddress.address}
                </p>
                {checkout.shippingAddress.city} ,{' '}
                {checkout.shippingAddress.country}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderConfirmationPage;
