import { useEffect } from "react";
import { Link } from "react-router-dom";
import { calendar } from "../constants/eventsData";

const Calendar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    
    <div className="flex min-h-screen py-12 px-4">
      <section id="calendar" className="w-full max-w-7xl mx-auto mt-20">
        {/* Header */}
        <div className="flex justify-center">
            <h2 className="text-3xl bg-black bg-opacity-60 rounded-lg font-bold text-center mb-10 uppercase text-yellow-400 px-6 py-2 max-w-fit">
                Event Calendar
            </h2>
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {calendar.map((event, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-60 border-yellow-500 border-2 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6"
            >
              <h3 className="text-xl text-yellow-400 font-bold text-center">
                {event.day}
              </h3>
              <p className="mt-2 text-yellow-300 text-center">{event.date}</p>
              <ul className="mt-4 text-gray-200 space-y-2">
                {event.activities.map((activity, activityIndex) => (
                  <li
                    key={activityIndex}
                    className="flex items-center space-x-2"
                  >
                    <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link to="/events">
            <button className="font-semibold border-2 border-yellow-500 text-white py-2 px-4 lg:py-3 lg:px-6 rounded-lg hover:bg-yellow-500 hover:text-black transition">
              Register for Events
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
