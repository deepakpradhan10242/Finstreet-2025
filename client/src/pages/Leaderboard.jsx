import React from "react";

const teamsData = [
  { id: 1, name: "Team Alpha", score: 95 },
  { id: 2, name: "Team Beta", score: 85 },
  { id: 3, name: "Team Gamma", score: 90 },
  { id: 4, name: "Team Delta", score: 98 },
  { id: 5, name: "Team Epsilon", score: 80 },
];

const Leaderboard = () => {
  
  const sortedTeams = [...teamsData].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen w-full md:w-10/12 lg:w-8/12 bg-black bg-opacity-60 rounded-xl py-12 px-4 mt-24 mb-10">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Team Leaderboard
        </h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-400 text-blue-900 text-left">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Team</th>
              <th className="px-4 py-2 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr
                key={team.id}
                className={`border-b ${
                  index === 0 ? "font-semibold" : ""
                }`}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{team.name}</td>
                <td className="px-4 py-2 text-right">{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
