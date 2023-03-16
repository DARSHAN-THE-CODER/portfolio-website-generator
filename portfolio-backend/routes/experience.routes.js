const express = require('express')

const router = express.Router()

const { createExperience, getExperience, updateExperience, deleteExperience } = require('../controllers/experience.controller')

router.post('/:username', createExperience)

router.get('/:username', getExperience)

router.patch('/:id', updateExperience)

router.delete('/:id', deleteExperience)

module.exports = router