const mongoose = require("mongoose")
const Tasks = mongoose.model("tasks")
const { validateCreateTaskInputs } = require("../Validators/taskValidator")

//create a new task
exports.create = async (req, res) => {
    let { errors, isValid } = await validateCreateTaskInputs(req.body)
    if (!isValid) {
        return res.status(400).json({
            status: false,
            errors
        })
    }
    try {
        let {title, description } = req.body;
        let user_id = req.user._id
        Tasks.create({
            title,
            description,
            created_by: user_id
        }).then(() => {
            return res.status(200).json({
                status: true,
                message: "Successfully created"
            })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({
                status: false,
                message: "Task creation failed"
            })
        })
    } catch (err) {
        console.log("Task creation failed",err)
        return res.status(400).json({
            status: false,
            message: "Sorry, something went wrong"
        })
    }
}