const express = require("express");
const {urlencoded, json} = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.connection.once("open", () => {
    console.log("Successfully connected to database.");
});
mongoose.connection.on("error", (error) => {
    console.log("Database error ", error);
});

// noinspection JSIgnoredPromiseFromCall
mongoose.connect("mongodb://localhost:27017/risk", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));

const blogPostRoutes = require("./models/blog_post/blogPostRouter");
app.use("/blogPosts", blogPostRoutes);

const userRoutes = require("./models/user/userRouter");
app.use("/user", userRoutes);

app.use((err, req, res) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json(
            {"message": `${err.name}: ${err.message}`}
        )
    }
});

const server = app.listen(3000);

module.exports = server;
