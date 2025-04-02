import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: 't-shirt',
      size: 'M',
      color: 'blue',
      quantity: 1,
      price: 15,
      image: 'https://picsum.photos/200?random=1',
    },
    {
      productId: 2,
      name: 'jeans',
      size: 'M',
      color: 'red',
      quantity: 1,
      price: 15,
      image: 'http://picsum.photos/200?random=1',
    },
  ];
  return (
    <div>
      {cartProducts.map((product) => (
        <div
          key={product.productId}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounder"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm">
                size:{product.size} | color:{product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounder px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">
                  {product.quantity}
                </span>
                <button className="border rounder px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <p className="font-bold">
              {product.price.toLocaleString()} $
            </p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
