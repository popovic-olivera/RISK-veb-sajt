const express = require("express");
const { urlencoded, json } = require("body-parser");
const mongoose = require("mongoose");

const blogPostController = require("./models/blog_post/blogPostController");

mongoose.connect("mongodb://localhost:27017/risk", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

const blogPostRoutes = require("./models/blog_post/blogPostRouter");
app.use("/blogPosts", blogPostRoutes);


app.listen(3000);
