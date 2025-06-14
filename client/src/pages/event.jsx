import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { events } from "../constants/eventsData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  SunMedium,
  CalendarClock,
  BadgeHelp,
  CalendarDays,
  MapPin,
  GalleryHorizontal,
} from "lucide-react";

const EventAlbum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeDay, setActiveDay] = useState("all");

  const filterEvents = (day) => {
    setActiveDay(day);
    if (day === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.day === Number(day)));
    }
  };

  const EventCard = ({ image, title, day, venue }) => (
    <div className="max-w-96 bg-black bg-opacity-60 border border-yellow-500 rounded-xl text-left shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-4 relative overflow-hidden">
      <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold shadow-md">
        Day {day}
      </span>

      <img
        src={image}
        alt={title}
        className="object-cover w-full h-48 sm:h-52 rounded-md border border-yellow-500"
      />

      <div className="mt-4 space-y-2 text-white">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <CalendarDays size={18} className="text-yellow-400" />
          {title}
        </h3>
        <p className="flex items-center gap-2 text-sm text-yellow-100">
          <MapPin size={16} className="text-yellow-300" />
          {venue}
        </p>
      </div>
    </div>
  );

  const buttons = [
    { label: "All", value: "all", icon: <Star size={18} /> },
    { label: "Day 1", value: 1, icon: <SunMedium size={18} /> },
    { label: "Day 2", value: 2, icon: <CalendarClock size={18} /> },
    { label: "Day 3", value: 3, icon: <BadgeHelp size={18} /> },
  ];

  const getButtonClass = (day) =>
    `flex items-center gap-2 px-5 py-2 rounded-full font-medium transition transform duration-200 text-sm sm:text-base ${
      activeDay === day
        ? "bg-yellow-500 text-black shadow-md scale-105"
        : "bg-yellow-100 text-gray-800 hover:bg-yellow-200 hover:scale-105"
    }`;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <section id="album" className="py-12 w-full max-w-screen-xl">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 mb-12">
          {buttons.map(({ label, value, icon }) => (
            <button
              key={value}
              title={`Show events for ${label}`}
              aria-label={`Filter: ${label}`}
              className={getButtonClass(value)}
              onClick={() => filterEvents(value)}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Title with consistent Calendar-style header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold uppercase bg-white/5 backdrop-blur-md border border-yellow-400 text-yellow-400 inline-flex items-center gap-3 px-6 py-3 rounded-md shadow">
            <GalleryHorizontal size={24} />
            Event Album
          </h2>
        </div>

        {/* Grid of Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/events/${event.id}`}>
                  <EventCard
                    image={event.image}
                    title={event.title}
                    day={event.day}
                    venue={event.venue}
                  />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default EventAlbum;
