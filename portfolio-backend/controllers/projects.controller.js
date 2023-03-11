
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const createProject = async (req, res) => {
    const {username} = req.params;
    const data = req.body;
    try {
        const project = await prisma.project.create({
            data: data.map((item) => ({
                ...item,
                user: {
                    connect: {
                        username: username
                    }
                }
            }))
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteProject = async (req, res) => {
    const {id} = req.params;
    try {
        const project = await prisma.project.delete({
            where: {id: Number(id)}
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateProject = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const project = await prisma.project.update({
            where: {id: Number(id)},
            data: data
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getProject = async (req, res) => {
    const {username} = req.params;
    try {
        const project = await prisma.project.findMany({
            where: {
                user: {
                    username: username
                }
            }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createProject,
    deleteProject,
    updateProject,
    getProject
};
