import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener(
        'scroll',
        updateScrollButtons
      );
      updateScrollButtons();
      return () =>
        container.removeEventListener(
          'scroll',
          updateScrollButtons
        );
    }
  }, [newArrivals]);

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behaviour: 'smooth',
    });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      setCanScrollLeft(leftScroll > 0);

      const rightScrollable =
        container.scrollWidth >
        leftScroll + container.clientWidth;
      setCanScrollRight(rightScrollable);
    }
    console.log({
      scrollLeft: container.scrollLeft,
      clientWidth: container.clientWidth,
      ContainerScrollWidth: container.scrollWidth,
      offsetleft: scrollRef.current.offsetLeft,
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">
          Explore New Arrivals
        </h2>
        <div className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the
          runway, freshly added to keep your wardrobe on the
          cutting edge of fashion
        </div>
        {/* Scroll button */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 ">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? 'bg-white text-black'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? 'bg-white text-black'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            className="relative min-w-[100vw] sm:min-w-[50vw] lg:min-w-[30vw]"
            key={product._id}
          >
            <img
              src={product.images[0]?.url}
              alt={
                product.images[0]?.altText || product.name
              }
              className="w-full h-[55vh] rounded-lg object-cover"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link
                to={`/products/${product._id}`}
                className="block"
              >
                <h4 className="font-medium">
                  {product.name}
                </h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
