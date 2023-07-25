const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskControllers")
const isAuthJWT = require("../middlewares/isAuthJWT")

router.post("/", isAuthJWT, taskController.create)
router.get("/", isAuthJWT, taskController.list)
router.put("/", isAuthJWT, taskController.update)
router.delete("/:id", isAuthJWT, taskController.delete)

module.exports = router