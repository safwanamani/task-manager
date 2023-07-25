require("./src/modals")
require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const routes = require("./src/routes")
const PORT = process.env.PORT;
const app = express();

//database connection
const mongoDBName = process.env.DB_NAME;
const mongoUser = process.env.DB_USER;
const mongoPassword = process.env.DB_PASSWORD;
const mongoURI = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.fyvbtlb.mongodb.net/${mongoDBName}`;

//database connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected")
}).catch(err => {
    console.log("Database error", err)
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", routes)

app.listen(PORT, () => {
    console.log(`Successfully running on port:${PORT}`)
})