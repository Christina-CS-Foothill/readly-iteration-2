const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.use(express.static("public")); //these files are visible to visiters of your site, "public", and will not change/aren't dynamic
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/new-story", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "new-story.html");
  res.sendFile(htmlFilePath);
});

app.get("/user-profile", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "user-profile.html");
  res.sendFile(htmlFilePath);
});

app.listen(8080);
