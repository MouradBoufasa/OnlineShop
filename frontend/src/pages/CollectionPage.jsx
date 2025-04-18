import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOption from '../components/Products/SortOption';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setisSidebarOpen(false);
    }
  };

  useEffect(() => {
    //   Add Event listner for click
    document.addEventListener('mousedown', handleClickOutside);
    //   Clean event listener
    return document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: 'product 1',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=1' }],
        },
        {
          _id: 2,
          name: 'product 2',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=2' }],
        },
        {
          _id: 3,
          name: 'product 3',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=3' }],
        },
        {
          _id: 4,
          name: 'product 4',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=4' }],
        },
        {
          _id: 5,
          name: 'product 5',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=5' }],
        },
        {
          _id: 6,
          name: 'product 6',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=6' }],
        },
        {
          _id: 7,
          name: 'product 7',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=7' }],
        },
        {
          _id: 8,
          name: 'product 8',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=8' }],
        },
        {
          _id: 9,
          name: 'product 9',
          price: 100,
          images: [{ url: 'https://picsum.photos/500/500?random=9' }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>
      {/* Filter sideBar */}
      <div
        className={`fixed inset-y-0 z-50 left-0 w-60 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 
         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        ref={sidebarRef}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* Sort Option */}
        <SortOption />
        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
