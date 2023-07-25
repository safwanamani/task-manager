const mongoose = require("mongoose");
const Users = mongoose.model("users");
const JWT = require("jsonwebtoken");
const config = require("../../config.json");
const accessTokenSecret = config.JWT_TOKEN_SECRET;
const { validateUserRegisterInputs, validateLoginInputs } = require("../Validators/userValidators");

//check email exists
exports.checkEmailExists = async (email, id) => {
  let query = { email, delete_status: false };
  if (id != null) {
    query._id = {
      $ne: id,
    };
  }
  return await Users.countDocuments(query);
};

//signup
exports.signup = async (req, res) => {
  let { errors, isValid } = await validateUserRegisterInputs(req.body);
  if (!isValid) {
    return res.json({
      status: false,
      errors,
    });
  }
  try {
    let { name, email, password } = req.body;
    if (await this.checkEmailExists(email, null)) {
      return res.json({
        status: false,
        message: "Email is already exists!",
      });
    }
    let user = await Users.create({
      name,
      email,
    });
    user.setPassword(password);
    await user.save();
    let accessToken = JWT.sign(
      { _id: user._id, name: user.name },
      accessTokenSecret
    );
    return res.json({
      status: true,
      message: "Successfully registered",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
};
//login
exports.login = async (req, res) => {
  try {
    let { errors, isValid } = await validateLoginInputs(req.body);
    if (!isValid) {
      return res.json({ status: false, errors });
    }
    let { email, password } = req.body;
    let user = await Users.findOne({
      email,
      delete_status: false,
    });
    if (user) {
      if (user.validatePassword(password)) {
        let accessToken = JWT.sign(
          { _id: user._id, name: user.name, type: user.type },
          accessTokenSecret
        );
        return res.json({
          status: true,
          message: "Login success",
          accessToken,
        });
      } else {
        return res.json({
          status: false,
          message: "Incorrect password",
        });
      }
    } else {
      return res.json({
        status: false,
        message: "Email is not registered with us",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      message: "Sorry, something went wrong",
    });
  }
};
