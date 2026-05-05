import Team from "../models/teamModel.js";

export const createTeam = async (req, res) => {
    try {
        const { name, description, members } = req.body;
        
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ success: false, message: "Team name already exists" });
        }

        const team = new Team({
            name,
            description,
            members: members || [req.user.id],
            admin: req.user.id
        });

        const savedTeam = await team.save();
        res.status(201).json({ success: true, team: savedTeam });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTeams = async (req, res) => {
    try {
        // Find teams where user is either admin or member
        const teams = await Team.find({
            $or: [
                { admin: req.user.id },
                { members: req.user.id }
            ]
        }).populate("admin", "username email").populate("members", "username email");
        
        res.status(200).json({ success: true, teams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addMember = async (req, res) => {
    try {
        const { teamId, userId } = req.body;
        const team = await Team.findById(teamId);
        
        if (!team) return res.status(404).json({ success: false, message: "Team not found" });
        if (team.admin.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Only admin can add members" });
        }

        if (team.members.includes(userId)) {
            return res.status(400).json({ success: false, message: "User already in team" });
        }

        team.members.push(userId);
        await team.save();
        
        res.status(200).json({ success: true, team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
