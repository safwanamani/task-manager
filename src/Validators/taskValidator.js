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