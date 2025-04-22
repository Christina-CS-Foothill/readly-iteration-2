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

  // for (const story of storedStories) {
  //   const authorId = story.authorid;
  //   console.log(authorId);
  //   const author = storedUsers.find((user) => user.id === authorId);
  //   console.log(author.username);
  //   story.authorname = author.username;
  //   story.imageurl = storyImageUrls[randomImageUrlIndex];
  //   story.upvotecount = upvoteCount;
  //   story.viewcount = viewCount;
  //   randomImageUrlIndex = Math.floor(Math.random() * storyImageUrls.length);
  //   upvoteCount = Math.floor(Math.random() * 200);
  //   viewCount = Math.floor(Math.random() * 2000);
  // }

  // console.log("Stories: ");
  // console.log(storedStories);
  // console.log("Users: ");
  // console.log(storedUsers);

  res.render("index", { stories: storedStories, users: storedUsers });
});

app.get("/new-story", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "new-story.html");
  res.sendFile(htmlFilePath);
});

app.post("/new-story", function (req, res) {
  const newStory = req.body;
  newStory.id = uuid.v4();
  newStory.createdDate = new Date().toDateString();
  //here, generate story image url, random view count and upvote count
  const storyImageUrls = [
    "/images/fantasy-cover.jpg",
    "/images/romance-cover.png",
    "/images/adventure-cover.png",
  ];
  let randomImageUrlIndex = Math.floor(Math.random() * storyImageUrls.length);
  let upvoteCount = Math.floor(Math.random() * 200);
  let viewCount = Math.floor(Math.random() * 2000);
  //also, use the given authorId to fetch the authorName, save it to new story object
  const usersFilePath = path.join(__dirname, "data", "users.json");
  const usersFileData = fs.readFileSync(usersFilePath);
  const storedUsers = JSON.parse(usersFileData);
  const user = storedUsers.find((user) => user.id === newStory.authorid);

  //add relevant data fields to new story obj
  newStory.authorname = user.username;
  newStory.imageurl = storyImageUrls[randomImageUrlIndex];
  newStory.upvotecount = upvoteCount;
  newStory.viewcount = viewCount;

  //retrieve saved list of stories
  const filePath = path.join(__dirname, "data", "stories.json");
  const fileData = fs.readFileSync(filePath);
  const storedStories = JSON.parse(fileData);

  //add new story obj to saved list of stories
  console.log(newStory);
  storedStories.push(newStory);
  fs.writeFileSync(filePath, JSON.stringify(storedStories));

  res.redirect("/new-chapter/" + newStory.id);
});

app.get("/story/:id", function (req, res) {
  //here, display the story + the associated chapters
  const storyId = req.params.id;
  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);

  const targetStory = storedStories.find((story) => story.id === storyId);

  const chaptersFilePath = path.join(__dirname, "data", "chapters.json");
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);

  const targetChapters = storedChapters.filter(
    (chapter) => chapter.storyId === storyId
  );

  // console.log(targetStory);
  // console.log(targetChapters);

  res.render("story", { story: targetStory, chapters: targetChapters });
});

app.get("/new-chapter/:id", function (req, res) {
  const authorId = req.params.id;

  const htmlFilePath = path.join(__dirname, "views", "new-chapter.html");
  res.sendFile(htmlFilePath);
});

app.post("/new-chapter", function (req, res) {
  const newChapter = req.body;
  newChapter.id = uuid.v4();
  newChapter.createdDate = new Date().toDateString();
  // write new chapter creations to the json file.
  const filePath = path.join(__dirname, "data", "chapters.json");
  const fileData = fs.readFileSync(filePath);
  const storedChapters = JSON.parse(fileData);

  console.log(newChapter);
  storedChapters.push(newChapter);

  fs.writeFileSync(filePath, JSON.stringify(storedChapters));

  res.redirect("/confirm");
});

app.get("/user-profile/:id", function (req, res) {
  const userId = req.params.id;
  // console.log(userId);

  const usersFilePath = path.join(__dirname, "data", "users.json");
  const usersFileData = fs.readFileSync(usersFilePath);
  const storedUsers = JSON.parse(usersFileData);

  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);

  const targetUser = storedUsers.find((user) => user.id === userId);
  const targetUserStories = storedStories.filter(
    (story) => story.authorid === userId
  );

  // console.log(targetUser);
  // console.log(targetUserStories);

  res.render("user-profile", {
    user: targetUser,
    userStories: targetUserStories,
  });
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
