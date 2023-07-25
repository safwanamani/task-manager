const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskControllers")
const isAuthJWT = require("../middlewares/isAuthJWT")

router.post("/create", isAuthJWT, taskController.create)
router.get("/", isAuthJWT, taskController.list)

module.exports = router