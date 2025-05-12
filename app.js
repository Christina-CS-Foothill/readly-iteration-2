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

app.get("/new-story/:id", function (req, res) {
  const userId = req.params.id;
  res.render("new-story", { userId: userId });
});

app.post("/new-story", function (req, res) {
  const newStory = req.body;
  console.log(newStory);
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

  //check if only one genre was selected
  if (typeof newStory.genre !== "object") {
    newStory.genre = [newStory.genre];
  }

  //retrieve saved list of stories
  const filePath = path.join(__dirname, "data", "stories.json");
  const fileData = fs.readFileSync(filePath);
  const storedStories = JSON.parse(fileData);

  //add new story obj to saved list of stories
  console.log(newStory);
  storedStories.push(newStory);
  fs.writeFileSync(filePath, JSON.stringify(storedStories));

  res.redirect("/story/" + newStory.id);
});

app.get("/edit-story/:id", function (req, res) {
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

  res.render("edit-story", { story: targetStory, chapters: targetChapters });
});

app.post("/edit-story/:id", function (req, res) {
  const storyId = req.params.id;
  const newStoryTitle = req.body.storytitle;
  const newStoryGenreList = req.body.genre;
  const newStorySummary = req.body.storysummary;
  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);

  const targetStory = storedStories.find((story) => story.id === storyId);

  //update the story data
  targetStory.storytitle = newStoryTitle;
  if (typeof newStoryGenreList === "object") {
    targetStory.genre = newStoryGenreList;
  } else {
    targetStory.genre = [newStoryGenreList];
  }
  targetStory.storysummary = newStorySummary;

  //save it to JSON file
  fs.writeFileSync(storiesFilePath, JSON.stringify(storedStories));

  //then redirect to story page to see the changes
  res.redirect("/story/" + storyId);
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

app.get("/delete-story/:id", function (req, res) {
  const storyId = req.params.id;

  //load all stories
  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);

  //load all chapters
  const chaptersFilePath = path.join(__dirname, "data", "chapters.json");
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);

  //find target story
  const targetStory = storedStories.find((story) => story.id === storyId);

  //get user/author id from target story
  const authorId = targetStory.authorid;

  //find target chapters
  const targetChapters = storedChapters.filter(
    (chapter) => chapter.storyId === storyId
  );

  //delete story chapters
  for (targetChapter of targetChapters) {
    //find index of the target chapter to delete
    const targetIndex = storedChapters.findIndex(
      (chapter) => chapter.id === targetChapter.id
    );

    //delete it using splice
    //console.log("the index of the chapter is: " + targetIndex);
    storedChapters.splice(targetIndex, 1);
  }
  // console.log("CHAPTERS");
  // console.log(storedChapters);

  //delete story
  const targetStoryIndex = storedStories.findIndex(
    (story) => story.id === targetStory.id
  );
  storedStories.splice(targetStoryIndex, 1);
  // console.log("STORIES");
  // console.log(storedStories);

  //rewrite updated stories list to json
  fs.writeFileSync(storiesFilePath, JSON.stringify(storedStories));
  //rewrite updated chapters list to json
  fs.writeFileSync(chaptersFilePath, JSON.stringify(storedChapters));

  //redirect to user profile since story no longer exists
  res.redirect("/user-profile/" + authorId);
});

app.get("/new-chapter/:id", function (req, res) {
  const storyId = req.params.id;
  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);

  const targetStory = storedStories.find((story) => story.id === storyId);

  //load the story obj

  res.render("new-chapter", { story: targetStory });
});

app.post("/new-chapter", function (req, res) {
  const newChapter = req.body;
  const storyId = req.body.storyId;
  newChapter.id = uuid.v4();
  newChapter.createdDate = new Date().toDateString();
  // write new chapter creations to the json file.
  const filePath = path.join(__dirname, "data", "chapters.json");
  const fileData = fs.readFileSync(filePath);
  const storedChapters = JSON.parse(fileData);

  console.log(newChapter);
  storedChapters.push(newChapter);

  fs.writeFileSync(filePath, JSON.stringify(storedChapters));

  res.redirect("/story/" + storyId);
});

app.get("/edit-chapter/:id", function (req, res) {
  const chapterId = req.params.id;
  const chaptersFilePath = path.join(__dirname, "data", "chapters.json");
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);

  const targetChapter = storedChapters.find(
    (chapter) => chapter.id === chapterId
  );

  res.render("edit-chapter", { chapter: targetChapter });
});

app.post("/edit-chapter/:id", function (req, res) {
  const chapterId = req.params.id;
  //load total list of chapter objs
  const chaptersFilePath = path.join(__dirname, "data", "chapters.json");
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);

  //find target chapter to edit
  const targetChapter = storedChapters.find(
    (chapter) => chapter.id === chapterId
  );

  //update target chapter attributes with user input
  targetChapter.chapterTitle = req.body.chapterTitle;
  targetChapter.chapterSummary = req.body.chapterSummary;
  targetChapter.chapterContent = req.body.chapterContent;

  //write changes back into the JSON file
  fs.writeFileSync(chaptersFilePath, JSON.stringify(storedChapters));

  // console.log("Chapter b4 editing:");
  // console.log(targetChapter);
  // console.log("chapter after editing:");
  // console.log(req.body);

  const storyId = targetChapter.storyId;

  res.redirect("/story/" + storyId);
});

app.get("/delete-chapter/:storyId/:chapterId", function (req, res) {
  const chapterId = req.params.chapterId;
  const storyId = req.params.storyId;

  //load all chapters
  const chaptersFilePath = path.join(__dirname, "data", "chapters.json");
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);

  //find index of the target chapter to delete
  const targetIndex = storedChapters.findIndex(
    (chapter) => chapter.id === chapterId
  );

  //delete it using splice
  // console.log("the index of the chapter is: " + targetIndex);
  storedChapters.splice(targetIndex, 1);

  //write edited chapter list back to json
  fs.writeFileSync(chaptersFilePath, JSON.stringify(storedChapters));
  // console.log(storedChapters);

  //redirect to story page
  res.redirect("/story/" + storyId);
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

  res.redirect("/user-profile/" + newId);
});

app.get("/edit-user/:id", function (req, res) {
  const userId = req.params.id;
  //retrieve user data
  const usersFilePath = path.join(__dirname, "data", "users.json");
  const usersFileData = fs.readFileSync(usersFilePath);
  const storedUsers = JSON.parse(usersFileData);
  //filter out the target user
  const targetUser = storedUsers.find((user) => user.id === userId);
  //send data back to rendered page
  res.render("edit-user", { user: targetUser });
});

app.post("/edit-user/:id", function (req, res) {
  //retrieve user data
  const userId = req.params.id;
  const usersFilePath = path.join(__dirname, "data", "users.json");
  const usersFileData = fs.readFileSync(usersFilePath);
  const storedUsers = JSON.parse(usersFileData);

  //filter out the target user
  const targetUser = storedUsers.find((user) => user.id === userId);

  //save changes/edits to the target user
  targetUser.username = req.body.username;
  targetUser.password = req.body.password;
  targetUser.userintro = req.body.userintro;
  // console.log(targetUser);

  //write changes back to json file
  fs.writeFileSync(usersFilePath, JSON.stringify(storedUsers));

  //redirect back to user profile page
  res.redirect("/user-profile/" + userId);
});

app.get("/delete-user/:id", function (req, res) {
  const userId = req.params.id;

  //load all users
  const usersFilePath = path.join(__dirname, "data", "users.json");
  const usersFileData = fs.readFileSync(usersFilePath);
  const storedUsers = JSON.parse(usersFileData);

  //load all stories
  const storiesFilePath = path.join(__dirname, "data", "stories.json");
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);

  //load all chapters
  const chaptersFilePath = path.join(__dirname, "data", "chapters.json");
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);

  //find target user
  const targetUser = storedUsers.find((user) => user.id === userId);

  //find target stories
  const targetUserStories = storedStories.filter(
    (story) => story.authorid === userId
  );

  //find target chapters
  let targetUserChapters = [];
  for (story of targetUserStories) {
    const storyChapters = storedChapters.filter(
      (chapter) => chapter.storyId === story.id
    );
    targetUserChapters = targetUserChapters.concat(storyChapters);
  }

  // console.log("all user chapters:");
  // console.log(targetUserChapters);

  //delete target chapters
  for (chapter of targetUserChapters) {
    const targetIndex = storedChapters.findIndex(
      (storedChapter) => storedChapter.id === chapter.id
    );
    // console.log(targetIndex);
    storedChapters.splice(targetIndex, 1);
  }

  //delete target stories
  for (story of targetUserStories) {
    const targetIndex = storedStories.findIndex(
      (storedStory) => storedStory.id === story.id
    );
    storedStories.splice(targetIndex, 1);
  }

  //delete target user
  const targetIndex = storedUsers.findIndex(
    (user) => user.id === targetUser.id
  );
  storedUsers.splice(targetIndex, 1);

  //write updated arrays back to JSON files
  fs.writeFileSync(chaptersFilePath, JSON.stringify(storedChapters));
  fs.writeFileSync(storiesFilePath, JSON.stringify(storedStories));
  fs.writeFileSync(usersFilePath, JSON.stringify(storedUsers));

  //redirect back to homepage
  res.redirect("/");
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.listen(8080);
