
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const createExperience = async (req, res) => {
    const {username} = req.params;
    const data = req.body;
    try {
        const experience = await prisma.experience.create({
            data: data.map((item) => ({
                ...item,
                user: {
                    connect: {
                        username: username
                    }
                }
            }))
        });
        res.json(experience);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteExperience = async (req, res) => {
    const {id} = req.params;
    try {
        const experience = await prisma.experience.delete({
            where: {id: Number(id)}
        });
        res.json(experience);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateExperience = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const experience = await prisma.experience.update({
            where: {id: Number(id)},
            data: data
        });
        res.json(experience);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getExperience = async (req, res) => {
    const {username} = req.params;
    try {
        const experience = await prisma.experience.findMany({
            where: {
                user: {
                    username: username
                }
            }
        });
        res.json(experience);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createExperience,
    deleteExperience,
    updateExperience,
    getExperience
}