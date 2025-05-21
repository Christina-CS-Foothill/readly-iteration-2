const path = require("path");
const express = require("express");

const defaultRoutes = require("./routes/default");
const storyRoutes = require("./routes/story");
const chapterRoutes = require("./routes/chapter");
const userRoutes = require("./routes/user");

const app = express();

app.set("views", path.join(__dirname, "views")); //for EJS
app.set("view engine", "ejs");

app.use(express.static("public")); //these files are visible to visiters of your site, "public", and will not change/aren't dynamic
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", storyRoutes);
app.use("/", chapterRoutes);
app.use("/", userRoutes);

app.listen(8080);
