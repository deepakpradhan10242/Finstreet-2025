import { events } from "../constants/eventsData";
import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { CalendarDays, Clock3, Landmark, MapPin, X } from "lucide-react";

const EventCard = () => {
  const navigate = useNavigate();
  const { backendUrl, userData } = useContext(UserContext);
  const { id } = useParams();
  const event = events.find((event) => event.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleParticipate = async () => {
    if (!userData?.id) {
      navigate("/user/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/events/${event?.id}/participate`,
        {
          userId: userData.id,
          title: event.title,
          time: event.time,
          date: event.date,
        }
      );

      data.success
        ? toast.success(data.message || "Successfully participated!")
        : toast.error(data.message || "Failed to participate.");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    window.scrollTo(0, 0);
    navigate("/events");
  };

  if (!event) {
    return <p className="text-center text-red-500 mt-20">Event not found!</p>;
  }

  return (
    <div className="relative px-4 py-20 lg:px-24 bg-black bg-opacity-60 mt-24 rounded-xl mb-10 text-white min-h-screen flex flex-col items-center">
      {/* Close Icon */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full p-2 transition-all duration-300 shadow-lg"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Event Image and Info */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <div className="relative flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="rounded-lg border-2 border-yellow-500 shadow-lg w-72 h-72 object-cover"
          />
          {event.day && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold shadow-md">
              Day {event.day}
            </span>
          )}
        </div>

        {/* Info Card */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-yellow-500 rounded-xl p-6 shadow-lg">
          <h2 className="text-3xl lg:text-4xl text-yellow-400 font-bold mb-6 flex items-center gap-3">
            <Landmark size={28} />
            {event.title}
          </h2>

          <div className="space-y-4 text-lg">
            <p className="flex items-center gap-2">
              <CalendarDays size={20} className="text-yellow-300" />
              <span>Date:</span> {event.date || "TBA"}
            </p>
            <p className="flex items-center gap-2">
              <Clock3 size={20} className="text-yellow-300" />
              <span>Time:</span> {event.time || "TBA"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={20} className="text-yellow-300" />
              <span>Venue:</span> {event.venue || "To be announced"}
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={handleParticipate}
              className="bg-yellow-100 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-16 w-full max-w-4xl bg-white/5 backdrop-blur-md border border-yellow-500 p-6 rounded-xl shadow-xl">
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">About the Event</h3>
        <p className="text-white text-base leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
