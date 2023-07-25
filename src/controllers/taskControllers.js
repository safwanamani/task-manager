const mongoose = require("mongoose");
const Tasks = mongoose.model("tasks");
const {
  validateCreateTaskInputs,
  validateUpdateTaskInputs,
} = require("../Validators/taskValidator");

//create a new task
exports.create = async (req, res) => {
  let { errors, isValid } = await validateCreateTaskInputs(req.body);
  if (!isValid) {
    return res.status(400).json({
      status: false,
      errors,
    });
  }
  try {
    let { title, description } = req.body;
    let user_id = req.user._id;
    Tasks.create({
      title,
      description,
      created_by: user_id,
    })
      .then(() => {
        return res.status(200).json({
          status: true,
          message: "Successfully created",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          status: false,
          message: "Task creation failed",
        });
      });
  } catch (err) {
    console.log("Task creation failed", err);
    return res.status(400).json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
};
// get tasks by user
exports.list = async (req, res) => {
  try {
    let user_id = req.user._id;
    let tasks = await Tasks.find({ created_by: user_id });
    if (tasks) {
      return res.status(200).json({
        status: true,
        data: tasks,
      });
    } else {
      return res.status(204).json({
        status: false,
        message: "No tasks found",
      });
    }
  } catch (err) {
    console.log("get tasks error", err);
    return res.status(400).json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
};
//update tasks
exports.update = async (req, res) => {
  let { errors, isValid } = await validateUpdateTaskInputs(req.body);
  if (!isValid) {
    return res.status(400).json({
      status: false,
      errors,
    });
  }
  try {
    let { task_id, title, description, status } = req.body;
    await Tasks.findByIdAndUpdate(
      task_id,
      { $set: { title, description, status } },
      { new: true }
    )
      .then((updateDoc) => {
        if (updateDoc) {
          return res.status(201).json({
            status: true,
            message: "Successfully updated",
            data: updateDoc,
          });
        } else {
          return res.status(404).json({
            status: false,
            message: "Task not found",
          });
        }
      })
      .catch((err) => {
        console.error("Error updating the task:", err);
        return res.status(400).json({
          status: false,
          message: "Task updation failed",
        });
      });
  } catch (err) {
    console.log("update task error", err);
    return res.status(400).json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
};
