const Router = require("express").Router()
const comment = require("../controllers/commentControllers");

Router.post('/create/:uid/:bid', comment.addComment)

module.exports = Router