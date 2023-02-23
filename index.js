const express = require("express");
const app = express();
require('dotenv').config()
require("./Models/config")
const bodyParser = require("body-parser");
const router = require('./routes/mainRouters')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', router)
const server = app.listen(process.env.PORT, function (req, res) {
  console.log(`Server is running on:${process.env.PORT}`);
});

module.exports = server
