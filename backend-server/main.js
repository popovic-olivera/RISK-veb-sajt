const express = require("express");
const {urlencoded, json} = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fileMiddleware = require("./models/file/fileMiddleware");
const jwt = require("express-jwt");
const path = require("path");

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
        useUnifiedTopology: true,
        useFindAndModify: false
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
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileMiddleware);

/* Auth won't stop at missing token, but will rather let the specific middleware decide what should be done in the
*  case of unauthorized access. The sole purpose of this middleware is to receive tokens, and store their
*  payload into the "req.authData" object, for example, if the token is successfully received, the following
*  middleware can read fields like "req.authData.id", but if the token is missing, unauthenticated access is
*  recognized by missing "req.authData" object. */
app.use(jwt({
    secret: "MY_SECRET", // FIXME secret should not be within the source code
    algorithms: ['HS256'],
    userProperty: "authData",
    credentialsRequired: false,
    // TODO add token expiration
}));

const blogPostRoutes = require("./models/blog_post/blogPostRouter");
app.use("/api/blogPosts", blogPostRoutes);

const userRoutes = require("./models/user/userRouter");
// TODO replace with "users"
app.use("/api/user", userRoutes);

const fileRoutes = require("./models/file/fileRouter");
app.use("/api/public", fileRoutes);

const meetingRoutes = require("./models/meeting/meetingRouter");
app.use("/api/meetings", meetingRoutes);

const imagesRoutes = require("./models/images/imagesRoutes");
app.use("/api/images", imagesRoutes);

// Catch unknown (and unsupported) requests
app.use(function (req, res) {
    res.status(405).send();
});

/* Catch internal errors. When an error occurs inside a middleware, execution automatically jumps to this error-handling
* middleware. Note that it is recognized as an error handling middleware as it has 4 parameters. */
app.use((err, req, res, _) => {
    console.log(err);
    // Expand with other error status codes as necessary
    const status = err.name === "UnauthorizedError" ? 401 : 500;
    res.status(status).send();
});

let server;
if (process.env.NODE_ENV === "test") {
    // Random free port is automatically assigned
    server = app.listen();
} else {
    server = app.listen(3000);
}

module.exports = server;
