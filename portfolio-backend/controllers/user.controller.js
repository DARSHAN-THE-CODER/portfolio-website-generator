const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    errorFormat: 'pretty',
    log: ['query', 'info', 'warn'],
  });

const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        // also return count of users
        const count = await prisma.user.count();
        console.log(count);
        const users = await prisma.user.findMany({
            // where:{
            //     NOT: [{about:null}]
            // }
        });
        res.json({ "count": count, "length": users?.length, "users": users });
        // return number of users and all user details in response , dont use select statement

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const checkUsername = async (req, res) => {
    const { username } = req.params
    console.log(username)
    try {
        const userExists = await prisma.user.findUnique({
            where: { username: username }
        })
        if (userExists)
            return res.status(200).send()

        return res.status(202).send()
    } catch (err) {
        console.log("error while checking username", err)
        return res.status(500).json({ error: err.message });
    }
}

const createUser = async (req, res) => {
    const { name, email, password, username } = req.body;
    try {
        // find if user exists with that username first or with email id

        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
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
    const data = req.body.data
        ;
    try {
        const user = await prisma.user.update({
            where: { username: username },
            data: {
                ...data
            },
        });
        res.json(user);
    } catch (error) {
        console.log(error)
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
    const { username, password } = req.body.data;
    console.log(username, password)
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }
        if (user.password === password) {
            return res.status(200).json(user);
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
        await prisma.socialLinks.deleteMany({
            where: {
                username: username
            }
        })
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
        await prisma.about.deleteMany({
            where: {
                username: username
            }
        })

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

    console.log(data)
    try {

        await prisma.skills.deleteMany({
            where: {
                username: username
            }
        })

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

const deleteUser = async (req, res) => {
    const { username } = req.params;
    try {
        const deletedUser = await prisma.user.delete({
            where: { username: username },
        });
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const contactFormSend = async (req, res) => {
    const { username } = req.params;
    const { senderName, senderMail, message } = req.body.data;
    try {
        const contactForm = await prisma.contactFormResponses.create({
            data: {
                senderName: senderName,
                senderMail: senderMail,
                message: message,
                user: {
                    connect: {
                        username: username
                    }
                }
            }
        });
        res.status(201).json(contactForm);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const getFormResponses = async (req, res) => {
    const { username } = req.params;
    try {
        const formResponses = await prisma.contactFormResponses.findMany({
            where: {
                username: username
            }
        });
        res.status(201).json(formResponses);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const deleteFormResponses = async (req, res) => {
    const { username } = req.params;
    try {
        const deleteFormResponses = await prisma.contactFormResponses.deleteMany({
            where: {
                username: username
            }
        });
        res.status(201).json(deleteFormResponses);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const deleteResponseById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteFormResponse = await prisma.contactFormResponses.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json(deleteFormResponse)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

// change password

// const changePassword = async (req, res) => {
//     const { username } = req.params;
//     const { password } = req.body;

//     try {
//         const user = await prisma.user.findUnique({

const hashAllPasswords = async (req, res) => {
    

   
    const transaction = await prisma.$transaction([]);
    // use transaction
    try {
        const users = await prisma.user.findMany();
        // return res.json(users)
        console.log(users)
        // loop through all users and update their password
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);

            // add the update operation to the transaction
            // transaction.push(
                await prisma.user.update({
                  where: { id: user.id },
                  data: { password: hashedPassword },
                  transaction
                })
            //   );
        }

        await transaction.$commit();
        res.json({ message: "All passwords have been hashed" });
    }
    catch (err) {
        // rollback the transaction if any update fails
        console.log(err)
        await transaction.$rollback;
        // throw err;
    }
}


module.exports = {
    getAllUsers,
    checkUsername,
    createUser,
    updateUser,
    getUser,
    userLogin,
    deleteUser,

    userSocialLinks,
    userAboutCards,
    createUserSkills,

    deleteAboutCard,
    deleteSkill,
    deleteSocialLink,

    updateAboutCard,
    updateSkill,
    updateSocialLink,

    contactFormSend,
    getFormResponses,
    deleteFormResponses,
    deleteResponseById,

    hashAllPasswords
}