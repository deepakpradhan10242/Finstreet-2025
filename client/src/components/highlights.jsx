import React, { useState, useEffect } from "react";
import hi2 from "../assets/hi2.jpg";
import hi3 from "../assets/hi3.jpg";
import hi4 from "../assets/hi4.jpg";
import { CalendarDays } from "lucide-react";

const EventHighlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const highlights = [
    { type: "image", src: hi2, alt: "Highlight 2" },
    { type: "image", src: hi3, alt: "Highlight 3" },
    { type: "image", src: hi4, alt: "Highlight 4" },
    { type: "image", src: hi4, alt: "Highlight 4 Duplicate" },
    { type: "image", src: hi4, alt: "Highlight 4 Extra" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === highlights.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? highlights.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === highlights.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="carousel" className="py-16 bg-transparent mt-12">
      {/* Headline - Updated to match EventAlbum and Calendar */}
      <div className="text-center mb-10 px-4">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase bg-white/5 backdrop-blur-md border border-yellow-400 text-yellow-400 inline-flex items-center gap-3 px-6 py-3 rounded-md shadow">
    <CalendarDays size={22} />
    Event Highlights
  </h2>

  <p className="mt-4 text-xs sm:text-sm md:text-base text-white bg-white/5 backdrop-blur-md border border-yellow-500/30 px-4 py-3 rounded-lg max-w-xl mx-auto shadow-md leading-relaxed">
    A glimpse into the <span className="text-yellow-300 font-medium">thrill and energy</span> of previous Finstreet events —
    <br className="hidden sm:block" /> witness the <span className="text-yellow-300 font-medium">memories come alive</span> through these moments!
  </p>
</div>


      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center"
            >
              <img
                src={highlight.src}
                alt={highlight.alt}
                className="w-4/5 sm:w-1/2 md:w-1/3 lg:w-6/12 h-auto object-cover rounded-lg shadow-lg hover:scale-95 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 px-4 py-2 text-white rounded hover:bg-yellow-400 hover:text-black transition"
          onClick={handlePrev}
        >
          &lt;
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 px-4 py-2 text-white rounded hover:bg-yellow-400 hover:text-black transition"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default EventHighlights;
