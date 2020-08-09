const express = require("express");
const {urlencoded, json} = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

async function loadMongoDB() {

    mongoose.connection.once("open", () => {
        console.log("Successfully connected to database.");
    });
    mongoose.connection.on("error", (error) => {
        console.log("Database error ", error);
    });

    let uri;
    if (process.env.NODE_ENV === "test") {
        const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
        const mongoMemoryServer = new MongoMemoryServer();
        uri = await mongoMemoryServer.getUri();
    } else {
        uri = "mongodb://localhost:27017/risk";
    }

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

loadMongoDB().catch((err) => {
    console.log(err);
    process.exit();
})

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));

const blogPostRoutes = require("./models/blog_post/blogPostRouter");
app.use("/api/blogPosts", blogPostRoutes);

const userRoutes = require("./models/user/userRouter");
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json(
            {"message": `${err.name}: ${err.message}`}
        )
    } else {
        next(req, res);
    }
});

app.use((req, res) => {
    res.status(404).send();
})

const server = app.listen(3000);

module.exports = server;
