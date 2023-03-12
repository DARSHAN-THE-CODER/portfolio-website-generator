const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { name, email, password, username } = req.body;
    try {
        // find if user exists with that username first 
        const userExists = await prisma.user.findUnique({
            where: { username: username },
        });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // if not, create user

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                username
            },
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    const { username } = req.params;
    const data = { ...req.body };
    try {
        const user = await prisma.user.update({
            where: { username: username },
            data: {
                ...data
            },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
            include: {
                projects: true,
                education: true,
                experience: true,
                socialLinks: true,
                skills: true,
                aboutCards: true,
                contactResponses: true,
            }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }
        if (user.password === password) {
            return res.json(user);
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const userSocialLinks = async (req, res) => {
    const { username } = req.params;
    const data = req.body.data;
    console.log(data)
    try {
        const userSocialLinks = await Promise.all(
            data.map(async (link) => {
                const createdLink = await prisma.socialLinks.create({
                    data: {
                        linkName: link.linkName,
                        url: link.url,
                        user: {
                            connect: {
                                username: username
                            }
                        }
                    }
                });
                return createdLink;
            })
        );

        res.status(201).json(userSocialLinks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const userAboutCards = async (req, res) => {
    const { username } = req.params;
    const data = req.body.data;
    try {
        const userAboutCards = await Promise.all(
            data.map(async (card) => {
                const createdCard = await prisma.about.create({
                    data: {
                        title: card.title,
                        description: card.description,
                        user: {
                            connect: {
                                username: username
                            }
                        }
                    }
                });
                return createdCard;
            }
            )
        );
        res.status(201).json(userAboutCards);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const createUserSkills = async (req, res) => {
    const { username } = req.params;

    const data = req.body.data;

    // i will get data in this format [{name: "HTML", percentage: 90}, {name: "CSS", percentage: 80}}]
    try {
        const userSkills = await Promise.all(
            data.map(async (skill) => {
                const createdSkill = await prisma.skills.create({
                    data: {
                        title: skill.title,
                        percentage: skill.percentage,
                        user: {
                            connect: {
                                username: username
                            }
                        }
                    }
                });
                return createdSkill;
            })
        );
        res.status(201).json(userSkills);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const deleteSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSkill = await prisma.skills.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedSkill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteSocialLink = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLink = await prisma.socialLinks.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedLink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteAboutCard = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCard = await prisma.about.delete({
            where: { id: parseInt(id) },
        });
        res.json(deletedCard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateSocialLink = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    console.log(data)
    try {
        const updatedLink = await prisma.socialLinks.update({
            where: { id: parseInt(id) },
            data: {
                ...data
            },
        });
        res.json(updatedLink);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const updateAboutCard = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    console.log(data)
    try {
        const updatedCard = await prisma.about.update({
            where: { id: parseInt(id) },
            data: {
                ...data
            },
        });
        res.json(updatedCard);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const updateSkill = async (req, res) => {
    const { id } = req.params;
    const data = { ...req.body };
    console.log(data)
    try {
        const updatedSkill = await prisma.skills.update({
            where: { id: parseInt(id) },
            data: {
                ...data
            },
        });
        res.json(updatedSkill);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    createUser,
    updateUser,
    getUser,
    userLogin,
    userSocialLinks,
    userAboutCards,
    createUserSkills,

    deleteAboutCard,
    deleteSkill,
    deleteSocialLink,

    updateAboutCard,
    updateSkill,
    updateSocialLink
}