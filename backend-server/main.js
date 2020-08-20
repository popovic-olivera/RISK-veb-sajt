const express = require("express");
const {urlencoded, json} = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fileMiddleware = require("./models/file/fileMiddleware")

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
});

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));
app.use(fileUpload());
app.use(fileMiddleware);

const blogPostRoutes = require("./models/blog_post/blogPostRouter");
app.use("/api/blogPosts", blogPostRoutes);

const userRoutes = require("./models/user/userRouter");
app.use("/api/user", userRoutes);

const fileRoutes = require("./models/file/fileRouter");
app.use("/api/files", fileRoutes);

const meetingRoutes = require("./models/meeting/meetingRouter");
app.use("/api/meetings", meetingRoutes);

// Catch unknown (and unsupported) requests
app.use(function (req, res) {
    res.status(405).send();
});

/* Catch internal errors. When an error occurs inside a middleware, execution automatically jumps to this error-handling
* middleware. Note that it is recognized as an error handling middleware as it has 4 parameters. */
app.use((err, req, res, _) => {
    // Expand with other error status codes as necessary
    const status = err.name === "UnauthorizedError" ? 401 : 500;
    res.status(status).send();
});

const port = process.env.NODE_ENV === "test" ? 3001 : 3000;

const server = app.listen(port);

module.exports = server;
