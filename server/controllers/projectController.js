import Project from "../models/projectModel.js";

export const createProject = async (req, res) => {
    try {
        const { name, description, status, progress, members } = req.body;
        
        const project = new Project({
            name,
            description,
            status,
            progress,
            members: members || [req.user.id],
            owner: req.user.id
        });

        const savedProject = await project.save();
        res.status(201).json({ success: true, project: savedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { owner: req.user.id },
                { members: req.user.id }
            ]
        }).populate("owner", "username email").populate("members", "username email");
        
        res.status(200).json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
