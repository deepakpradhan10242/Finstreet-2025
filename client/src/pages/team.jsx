import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-hot-toast";

const TeamRegistration = () => {
  const { backendUrl } = useContext(UserContext);
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({ name: "" });
  const [joinData, setJoinData] = useState({ teamCode: "" });
  const [isJoining, setIsJoining] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isJoining) {
      setJoinData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        isJoining
          ? `${backendUrl}/api/user/team/join`
          : `${backendUrl}/api/user/team`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(isJoining ? joinData : formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unknown error occurred");
      }

      toast.success(data.message || (isJoining ? "Joined team!" : "Team registered!"));
      setFormData({ name: "" });
      setJoinData({ teamCode: "" });

      if (!isJoining) {
        navigate("/team/teamdashboard");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full md:w-10/12 lg:w-8/12 bg-black bg-opacity-60 flex items-center justify-center rounded-xl py-12 px-4 mt-24 mb-10">
      <div className="bg-white/5 backdrop-blur-md shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-yellow-400">
          {isJoining ? "Join a Team" : "Register Your Team"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isJoining ? (
            <div>
              <label className="block mb-1 text-yellow-400 font-medium">Team Code</label>
              <input
                type="text"
                name="teamCode"
                value={joinData.teamCode}
                onChange={handleChange}
                required
                className="w-full border bg-white/5 backdrop-blur-md border-yellow-200 rounded px-3 py-2"
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1 text-yellow-400 font-medium">Team Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border bg-white/5 backdrop-blur-md border-yellow-200 rounded px-3 py-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-200 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded"
          >
            {isJoining ? "Join Team" : "Register Team"}
          </button>
        </form>

        <button
          className="mt-4 text-sm text-yellow-300 underline w-full text-center"
          onClick={() => setIsJoining(!isJoining)}
        >
          {isJoining ? "Want to register a team instead?" : "Want to join an existing team?"}
        </button>
      </div>
    </div>
  );
};

export default TeamRegistration;
