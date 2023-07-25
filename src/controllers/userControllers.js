const mongoose = require("mongoose")
const Users = mongoose.model("users")
const JWT = require("jsonwebtoken")
const config = require("../../config.json")
const accessTokenSecret = config.JWT_TOKEN_SECRET
const { validateUserRegisterInputs } = require("../Validators/userValidators");

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
      let accessToken = JWT.sign({_id: user._id, name: user.name}, accessTokenSecret)
      return res.json({
        status: true,
        message: "Successfully registered",
        accessToken
      });
    } catch (err) {
      console.log(err);
      return res.json({
        status: false,
        message: "Sorry, something went wrong",
      });
    }
  };