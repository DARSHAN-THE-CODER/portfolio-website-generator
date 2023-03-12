const express = require('express')

const router = express.Router()

const { createUser, getUser, updateUser, userLogin, userSocialLinks, userAboutCards, createUserSkills, deleteAboutCard, deleteSkill, deleteSocialLink, updateAboutCard, updateSocialLink, updateSkill } = require('../controllers/user.controller')

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

module.exports = router