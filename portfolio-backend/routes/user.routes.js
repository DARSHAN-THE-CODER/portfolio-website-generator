const express = require('express')

const router = express.Router()

const { hashAllPasswords, getAllUsers, checkUsername, createUser, getUser, updateUser, userLogin, deleteUser, userSocialLinks, userAboutCards, createUserSkills, deleteAboutCard, deleteSkill, deleteSocialLink, updateAboutCard, updateSocialLink, updateSkill, contactFormSend, getFormResponses, deleteFormResponses, deleteResponseById } = require('../controllers/user.controller')

router.patch('/', hashAllPasswords )

router.get('/', getAllUsers)

router.get('/username/:username', checkUsername)

router.get('/form-response/:username', getFormResponses)

router.post('/form-response/:username', contactFormSend)

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

router.delete('/form-response/id/:id', deleteResponseById)

router.delete('/form-response/:username', deleteFormResponses)

router.delete('/:username', deleteUser)

module.exports = router