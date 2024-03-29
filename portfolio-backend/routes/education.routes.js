const express = require('express')

const router = express.Router()


const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/education.controller')

router.post('/:username', createEducation)

router.get('/:username', getEducation)

router.patch('/:id', updateEducation)

router.delete('/:id', deleteEducation)

module.exports = router