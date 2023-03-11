const express = require('express')

const router = express.Router()

const { createExperience, getExperience, updateExperience, deleteExperience } = require('../controllers/experience.controller')

router.get('/:username', getExperience)

router.post('/:username', createExperience)

router.patch('/:id', updateExperience)

router.delete('/:id', deleteExperience)

module.exports = router