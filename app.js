const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");

const app = express();

app.set("views", path.join(__dirname, "views")); //for EJS
app.set("view engine", "ejs");

app.use(express.static("public")); //these files are visible to visiters of your site, "public", and will not change/aren't dynamic
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  //as soon as homepage/index loads, print list of users/authors and total list of stories to console
  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const usersFilePath = path.join(__dirname, "data", "users.json");

  const storiesFileData = fs.readFileSync(storiesFilePath);
  const usersFileData = fs.readFileSync(usersFilePath);

  const storedStories = JSON.parse(storiesFileData);
  const storedUsers = JSON.parse(usersFileData);

  console.log("Stories: ");
  console.log(storedStories);
  console.log("Users: ");
  console.log(storedUsers);

  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/new-story", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "new-story.html");
  res.sendFile(htmlFilePath);
});

app.post("/new-story", function (req, res) {
  const newStory = req.body;
  newStory.id = uuid.v4();
  newStory.createdDate = new Date();

  const filePath = path.join(__dirname, "data", "stories.json");
  const fileData = fs.readFileSync(filePath);
  const storedStories = JSON.parse(fileData);

  console.log(newStory);
  storedStories.push(newStory);

  fs.writeFileSync(filePath, JSON.stringify(storedStories));

  res.redirect("/new-chapter/" + newStory.id);
});

app.get("/new-chapter/:id", function (req, res) {
  const authorId = req.params.id;

  const htmlFilePath = path.join(__dirname, "views", "new-chapter.html");
  res.sendFile(htmlFilePath);
});

app.post("/new-chapter", function (req, res) {
  const newChapter = req.body;
  newChapter.id = uuid.v4();
  newChapter.createdDate = new Date();
  // write new chapter creations to the json file.
  const filePath = path.join(__dirname, "data", "chapters.json");
  const fileData = fs.readFileSync(filePath);
  const storedChapters = JSON.parse(fileData);

  console.log(newChapter);
  storedChapters.push(newChapter);

  fs.writeFileSync(filePath, JSON.stringify(storedChapters));

  res.redirect("/confirm");
});

app.get("/user-profile", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "user-profile.html");
  res.sendFile(htmlFilePath);
});

app.get("/create-user", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "create-user.html");
  res.sendFile(htmlFilePath);
});

app.post("/create-user", function (req, res) {
  const newUser = req.body;
  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const storedUsers = JSON.parse(fileData);

  const newId = uuid.v4();
  newUser.id = newId;
  storedUsers.push(newUser);

  console.log(storedUsers);

  fs.writeFileSync(filePath, JSON.stringify(storedUsers));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.listen(8080);
