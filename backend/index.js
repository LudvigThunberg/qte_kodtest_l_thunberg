//CONFIG
require("dotenv").config();
require("./database.js");

//COMMENT
//REQUIREMENTS
const express = require("express");
const cors = require("cors");

// APP INIT
const app = express();

// ROUTER REQUIREMENTS
const postsRouter = require("./routers/postsRouter.js");
const commentsRouter = require("./routers/commentsRouter.js");

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//ROUTERS
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// LISTENING PORT
app.listen(8000, ()=> {
    console.log("http://localhost:8000/");
});