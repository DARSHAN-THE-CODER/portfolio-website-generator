
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const createEducation = async (req, res) => {
    const {username} = req.params;
    const data = req.body;
    try {
        const education = await prisma.education.create({
            data: data.map((item) => ({
                ...item,
                user: {
                    connect: {
                        username: username
                    }
                }
            }))
        });
        res.json(education);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteEducation = async (req, res) => {
    const {id} = req.params;
    try {
        const education = await prisma.education.delete({
            where: {id: Number(id)}
        });
        res.json(education);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateEducation = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try {
        const education = await prisma.education.update({
            where: {id: Number(id)},
            data: data
        });
        res.json(education);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getEducation = async (req, res) => {
    const {username} = req.params;
    try {
        const education = await prisma.education.findMany({
            where: {
                user: {
                    username: username
                }
            }
        });
        res.json(education);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createEducation,
    deleteEducation,
    updateEducation,
    getEducation
}
