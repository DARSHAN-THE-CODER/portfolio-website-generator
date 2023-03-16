const express = require('express')

const router = express.Router()

const { getProject, createProject, updateProject, deleteProject } = require('../controllers/projects.controller')

router.post('/:username', createProject)

router.get('/:username', getProject)

router.patch('/:id', updateProject)

router.delete('/:id', deleteProject)

module.exports = router