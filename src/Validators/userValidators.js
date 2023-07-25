const Validator = require("validator")
const isEmpty = require("./isEmpty")

//validate user signup inputs
exports.validateUserRegisterInputs = (data) => {
    let errors = []
    if (typeof data.name === "undefined") data.name = ""
    if (typeof data.email === "undefined") data.email = ""
    if (typeof data.password === "undefined") data.password = ""
    if (typeof data.confirm_password === "undefined") data.confirm_password = ""

    if (Validator.isEmpty(data.name)) {
        errors.push("Name is required")
    }
    if (Validator.isEmpty(data.email)) {
        errors.push("Email is required")
    }
    if (!Validator.isEmail(data.email)) {
        errors.push("Please enter a valid email")
    }
    if (Validator.isEmpty(data.password)) {
        errors.push("Password is required")
    } else if (!Validator.isLength(data.password, {min: 6})) {
        errors.push("Your password must be at least 6 characters long")
    }
    if (Validator.isEmpty(data.confirm_password)) {
        errors.push("Confirm password is required")
    }
    if (!Validator.isEmpty(data.confirm_password) && !Validator.equals(data.password, data.confirm_password)) {
        errors.push("Password and confirm password should be match")
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}