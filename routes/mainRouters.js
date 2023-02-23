const express = require('express')
const router = express.Router()
const userRoutes = require('./userRouters')
const blogRoutes = require('./blogRouters')
const commentRoutes = require('./commentRouters')

router.use('/user', userRoutes)
router.use('/blog', blogRoutes)
router.use('/comment', commentRoutes)

module.exports = router;
