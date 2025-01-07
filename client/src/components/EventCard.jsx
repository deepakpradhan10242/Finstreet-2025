import { events } from "../constants/eventsData";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const EventCard = () => {
  const navigate = useNavigate();
  const { backendUrl, userData,} = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const event = events.find((event) => event.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const handleParticipate = async () => {
    if (!userData || !userData.id) {
      navigate("/user/login");
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/events/${event?.id}/participate`, {
        userId: userData.id,
        title: event.title,
        time: event.time,
        date: event.date,
      });
      
      if (data.success) {
        toast.success(data.message || "Successfully participated!");
      } else {
        toast.error(data.message || "Failed to participate.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      console.error("Participation error:", error);
    }
  };

  if (!event) {
    return <p className="text-center text-red-500">Event not found!</p>;
  }

  return (
    <div className="px-4 bg-opacity-60 lg:px-24 flex flex-col lg:flex-row lg:items-start items-center justify-between">
      <div className="max-w-xs mt-40 lg:mb-40 bg-black bg-opacity-60 border-2 border-yellow-500 rounded-lg text-center shadow-lg hover:shadow-2xl m-5 hover:scale-105 transition-all duration-300 p-4">
        <img
          src={event.image}
          alt={event.title}
          className="h-80 lg:h-96 w-auto lg:mb-0  border-yellow-500 transition-transform transform hover:scale-105"
        />
      </div>
    
      <div className="w-full lg:w-2/3 bg-black bg-opacity-60 mb-10 lg:px-5 py-5 rounded-lg lg:mt-40 lg:mb-40 text-center lg:text-left lg:ml-8">
        <h2 className="text-3xl lg:text-4xl text-yellow-500 font-bold mb-3">{event.title}</h2>

        <div className="lg:hidden">
          <button
            className="border-2 border-yellow-400 text-white font-semibold px-5 py-2 rounded w-56 mb-4"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            aria-controls="description"
          >
            {isOpen ? "Hide Description" : "Show Description"}
          </button>
          {isOpen && <p id="description" className="text-base text-white mb-4">{event.description}</p>}
        </div>

        <div className="hidden lg:block">
          <p className="text-base text-white mb-4">{event.description}</p>
        </div>

        <p className="text-xl font-semibold mt-4 mb-20 lg:mt-0">
          [ Date: {event.date || "TBA"} ] [ Time: {event.time || "TBA"} ]
        </p>

        <div className="flex justify-center lg:justify-center gap-4 mb-10 mt-8">
          <button
            onClick={handleParticipate}
            className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg w-56 lg:w-56 hover:bg-yellow-400 shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Participate
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;