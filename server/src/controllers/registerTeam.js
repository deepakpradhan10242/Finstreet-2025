import Team from '../models/teamModel.js';
import { generateInviteCode } from '../utils/generateInviteCode.js';

export const registerTeam = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    // Check if team name already exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(409).json({ message: "Team name already exists" });
    }

    // Generate a unique invite code
    let inviteCode;
    let isUnique = false;

    while (!isUnique) {
      inviteCode = generateInviteCode(name);
      const existingCode = await Team.findOne({ inviteCode });
      if (!existingCode) isUnique = true;
    }

    const newTeam = new Team({
      name,
      inviteCode,
    });

    await newTeam.save();

    res.status(201).json({
      message: "Team registered successfully",
      team: {
        name: newTeam.name,
        inviteCode: newTeam.inviteCode,
      },
    });
  } catch (err) {
    console.error("Error registering team:", err);
    res.status(500).json({ message: "Server error" });
  }
};
