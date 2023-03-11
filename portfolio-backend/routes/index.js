const express = require('express')

const router = express.Router()

const userRoutes = require('./user.routes')
const blogsRoutes = require('./blogs.routes')
const educationRoutes = require('./education.routes')
const experienceRoutes = require('./experience.routes')
const projectsRoutes = require('./projects.routes')

console.log('index.js')

router.use('/user', userRoutes)
router.use('/blogs', blogsRoutes)
router.use('/education', educationRoutes)
router.use('/experience', experienceRoutes)
router.use('/projects', projectsRoutes)

module.exports = router