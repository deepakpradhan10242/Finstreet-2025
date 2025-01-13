import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { backendUrl, userData } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      if (!userData) return;

      try {
        const response = await axios.get(
          `${backendUrl}/api/user/${userData.id}/dashboard`
        );
        if (response.data.success && isMounted) {
          setEvents(response.data.events);
        } else if (isMounted) {
          toast.error("No events found.");
        }
      } catch (error) {
        if (isMounted) {
          toast.error(
            error.response?.data?.message || "Error fetching events."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [userData, backendUrl]);

  const handleRemoveFromEvent = async (eventId) => {
    if (!userData) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/user/${userData.id}/event/${eventId}`
      );
      if (response.data.success) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
        toast.success("Successfully removed.");
      } else {
        toast.error(response.data.message || "Error removing user from event.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error removing from event."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-br from-blue-300 to-blue-900 min-h-screen p-6">
      <header className="flex flex-col items-center my-6 mb-20 mt-24">
        <h2 className="text-3xl bg-slate-900 rounded-lg font-bold text-center mb-8 uppercase text-yellow-400 px-6 py-2 max-w-fit">
          dashboard
        </h2>
        <span className="text-xl lg:text-2xl font-bold text-slate-900">
          {userData?.email || "Guest"}
        </span>
      </header>

      <main className="w-full max-w-4xl bg-slate-900 p-6 rounded-lg shadow-lg mb-20">
        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">
          Events You Participated In
        </h2>

        {loading ? (
          <p className="text-white">Loading events...</p>
        ) : events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <span className="text-lg text-gray-800">{event.title}</span>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Ensure no parent click handlers interfere
                    handleRemoveFromEvent(event._id);
                  }}
                  className="text-red-500 text-3xl font-bold hover:text-red-700 focus:outline-none active:scale-90"
                  aria-label="Remove Event"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-center">No events to show.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
