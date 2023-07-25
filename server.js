const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const config = require("./config.json")
const PORT = config.PORT
const MONGO_URL = config.MONGO_URI
const app = express()

//database connection
mongoose.connect(MONGO_URL).then(() => {
    console.log("Database connected")
}).catch(err => {
    console.log("Database error", err)
})

app.use(morgan('dev'))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Successfully running on port:${PORT}`)
})