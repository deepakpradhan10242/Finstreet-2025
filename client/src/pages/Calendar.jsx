import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calendar } from "../constants/eventsData";
import {
  CalendarDays,
  ListTodo,
  ChevronDown,
  CalendarSearch,
  ArrowRight,
} from "lucide-react";

const Calendar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen w-full md:w-10/12 lg:w-8/12 mx-auto bg-black bg-opacity-60 rounded-xl text-white py-12 px-4 mt-24 mb-10">
      <section id="calendar" className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase bg-white/5 backdrop-blur-md border border-yellow-400 text-yellow-400 inline-flex items-center gap-3 px-6 py-3 rounded-md shadow">
            <CalendarSearch size={24} /> Event Calendar
          </h2>
        </div>

        {/* Accordion List */}
        <div className="w-full space-y-5">
          {calendar.map((event, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-yellow-500 bg-white/5 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-yellow-500/20 transition"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full text-left text-yellow-300"
                >
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-2">
                      <CalendarDays size={16} />
                      {event.date}
                    </p>
                    <p className="text-xs text-yellow-400 mt-1">{event.day}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 mt-2 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="mt-3 space-y-2 text-sm text-gray-200">
                    {event.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ListTodo size={14} className="text-yellow-300 mt-0.5" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Register Button */}
        <div className="mt-12 text-center">
          <Link to="/events">
            <button className="w-full max-w-3xl mx-auto group font-semibold border-2 bg-white/5 backdrop-blur-md border-yellow-400 text-white py-2 px-6 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md hover:shadow-yellow-400/30 flex justify-center items-center gap-2 text-center">
              <span>Register for Events</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
