const express = require('express')

const router = express.Router()

const { getProject, createProject, updateProject, deleteProject } = require('../controllers/projects.controller')

router.get('/:username', getProject)

router.post('/:username', createProject)

router.patch('/:id', updateProject)

router.delete('/:id', deleteProject)

module.exports = router