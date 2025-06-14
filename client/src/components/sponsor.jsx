import React, { useState, useEffect } from 'react';
import { sponsors } from '../constants/sponsorsData';

const Sponsors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  return (
    <section id="sponsor" className="max-w-6xl mx-auto px-5 mt-28 mb-16">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase bg-white/5 backdrop-blur-md border border-yellow-400 text-yellow-400 inline-flex items-center gap-3 px-6 py-3 rounded-md shadow">
          FINSTREET'25 Sponsors
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-white bg-white/5 backdrop-blur-md border border-yellow-500/30 px-4 py-3 rounded-lg max-w-2xl mx-auto shadow-md leading-relaxed">
          Heartfelt thanks to our <span className="text-yellow-300 font-medium">esteemed sponsors</span> for their unwavering support and commitment — adding a touch of excellence to <span className="text-yellow-300 font-medium">FINSTREET'25</span>.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mt-8 overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-linear"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full px-4 flex justify-center items-center"
            >
              <img
  src={sponsor.image}
  alt={sponsor.alt}
  className="object-contain w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto rounded-lg bg-white border border-gray-300 transition-transform duration-1000 ease-in-out hover:scale-105"
/>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
