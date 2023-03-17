
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createProject = async (req, res) => {
    const { username } = req.params;
    const data = req.body.data;
    try {
        // use await promise.all
        await prisma.projects.deleteMany({
            where: {
                username: username
            }
        })
        
        const project = await Promise.all(data.map(async (item) => {
            const project = await prisma.projects.create({
                data: {
                    ...item,
                    user: {
                        connect: {
                            username: username
                        }
                    }
                }
            });
            return project;
        }
        ));
        res.json(project);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await prisma.projects.delete({
            where: { id: Number(id) }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProject = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const project = await prisma.projects.update({
            where: { id: Number(id) },
            data: data
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProject = async (req, res) => {
    const { username } = req.params;
    try {
        const project = await prisma.projects.findMany({
            where: {
                user: {
                    username: username
                }
            }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProject,
    deleteProject,
    updateProject,
    getProject
};
