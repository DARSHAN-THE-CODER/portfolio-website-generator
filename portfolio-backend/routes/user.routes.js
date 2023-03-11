const express = require('express')

const router = express.Router()

const { createUser, getUser, updateUser, userLogin, userSocialLinks, userAboutCards, createUserSkills, deleteAboutCard, deleteSkill, deleteSocialLink } = require('../controllers/user.controller')

router.get('/:username', getUser)

router.post('/', createUser)

router.patch('/:username', updateUser)

router.post('/login', userLogin)

router.post('/social-links/:username', userSocialLinks)

router.post('/about-cards/:username', userAboutCards)

router.post('/skills/:username', createUserSkills)

router.delete('/skills/:id', deleteSkill)

router.delete('/social-links/:id', deleteSocialLink)

router.delete('/about-cards/:id', deleteAboutCard)

module.exports = router