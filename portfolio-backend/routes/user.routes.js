const express = require('express')

const router = express.Router()

const { getAllUsers, checkUsername, createUser, getUser, updateUser, userLogin, deleteUser, userSocialLinks, userAboutCards, createUserSkills, deleteAboutCard, deleteSkill, deleteSocialLink, updateAboutCard, updateSocialLink, updateSkill } = require('../controllers/user.controller')

router.get('/', getAllUsers)

router.get('/username/:username', checkUsername)

router.post('/', createUser)

router.get('/:username', getUser)

router.patch('/:username', updateUser)

router.post('/login', userLogin)

router.post('/social-links/:username', userSocialLinks)

router.post('/about-cards/:username', userAboutCards)

router.post('/skills/:username', createUserSkills)

router.patch('/skills/:id', updateSkill)

router.patch('/social-links/:id', updateSocialLink)

router.patch('/about-cards/:id', updateAboutCard)

router.delete('/skills/:id', deleteSkill)

router.delete('/social-links/:id', deleteSocialLink)

router.delete('/about-cards/:id', deleteAboutCard)

router.delete('/:username', deleteUser)

module.exports = router