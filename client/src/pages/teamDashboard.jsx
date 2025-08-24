import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import UserContext from "../context/UserContext";

const TeamDashboard = () => {
  const { backendUrl } = useContext(UserContext);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/team/dashboard`, {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch dashboard");

      setTeam(data.team);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-32 text-yellow-300 text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center mt-32 text-red-400 text-lg">
        No team data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-24 mb-10 text-white bg-black/60 rounded-xl backdrop-blur-md">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        Team Dashboard: {team.name}
      </h1>

      <div className="bg-white/10 rounded-lg p-4 shadow-md mb-6">
        <h2 className="text-xl font-semibold text-yellow-300 mb-2">Members</h2>
        <ul className="list-disc list-inside">
          {team.members.map((member) => (
            <li key={member._id}>
              {member.name} – <span className="text-sm text-yellow-200">{member.email}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white/10 rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-2">Participated Events</h2>
        {team.events && team.events.length > 0 ? (
          <ul className="list-disc list-inside">
            {team.events.map((event) => (
              <li key={event._id}>
                {event.title} – <span className="text-sm text-yellow-200">{event.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-200">No events participated yet.</p>
        )}
      </div>
    </div>
  );
};

export default TeamDashboard;
