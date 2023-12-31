require("dotenv").config();
const mongoose = require('mongoose')
const CryptoJs = require("crypto-js")
const Schema = mongoose.Schema
let nonce = process.env.HASH_PASSWORD_NONCE
let message = process.env.HASH_PASSWORD_MESSAGE
let path = process.env.HASH_PASSWORD_PATH

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: String,
    delete_status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

userSchema.methods.setPassword = function (password) {
    let salt = CryptoJs.SHA256(nonce + password)
    this.hash = CryptoJs.enc.Base64.stringify(CryptoJs.HmacSHA256(path + salt, message))
}

userSchema.methods.validatePassword = function (password) {
    let salt = CryptoJs.SHA256(nonce + password)
    const hash = CryptoJs.enc.Base64.stringify(CryptoJs.HmacSHA256(path + salt, message))
    return this.hash === hash;
}

module.exports = users = mongoose.model('users', userSchema)