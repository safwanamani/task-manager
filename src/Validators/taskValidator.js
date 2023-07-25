const Validator = require("validator")
const isEmpty = require("./isEmpty")

//validate task create inputs
exports.validateCreateTaskInputs = (data) => {
    let errors = []
    if (typeof data.title === "undefined") data.title = ""
    if (Validator.isEmpty(data.title)) {
        errors.push("Title is required")
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
//validate update task inputs
exports.validateUpdateTaskInputs = (data) => {
    let errors = []
    if (typeof data.task_id === "undefined") data.task_id = ""
    if (typeof data.title === "undefined") data.title = ""
    if (typeof data.status === "undefined") data.status = ""
    if (Validator.isEmpty(data.task_id)) {
        errors.push("Task id is required")
    }
    if (Validator.isEmpty(data.title)) {
        errors.push("Title is required")
    }
    if (Validator.isEmpty(data.status)) {
        errors.push("Status is required")
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}