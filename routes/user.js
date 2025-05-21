const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const userData = require("../util/user-data");
const storyData = require("../util/story-data");
const chapterData = require("../util/chapter-data");

router.get("/user-profile/:id", function (req, res) {
  const userId = req.params.id;
  // console.log(userId);

  const storedUsers = userData.getStoredUsers();
  const storedStories = storyData.getStoredStories();

  const targetUser = storedUsers.find((user) => user.id === userId);
  const targetUserStories = storedStories.filter(
    (story) => story.authorid === userId
  );

  res.render("user-profile", {
    user: targetUser,
    userStories: targetUserStories,
  });
});

router.get("/create-user", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "create-user.html");
  // res.sendFile(htmlFilePath);
  res.render("create-user");
});

router.post("/create-user", function (req, res) {
  const newUser = req.body;
  const storedUsers = userData.getStoredUsers();

  const newId = uuid.v4();
  newUser.id = newId;
  storedUsers.push(newUser);
  console.log(storedUsers);

  userData.storeUsers(storedUsers);

  res.redirect("/user-profile/" + newId);
});

router.get("/edit-user/:id", function (req, res) {
  const userId = req.params.id;
  //retrieve user data
  const storedUsers = userData.getStoredUsers();
  //filter out the target user
  const targetUser = storedUsers.find((user) => user.id === userId);
  //send data back to rendered page
  res.render("edit-user", { user: targetUser });
});

router.post("/edit-user/:id", function (req, res) {
  //retrieve user data
  const userId = req.params.id;
  const storedUsers = userData.getStoredUsers();

  //filter out the target user
  const targetUser = storedUsers.find((user) => user.id === userId);

  //save changes/edits to the target user
  targetUser.username = req.body.username;
  targetUser.password = req.body.password;
  targetUser.userintro = req.body.userintro;
  targetUser.favoredGenres = req.body.favoredGenres;

  //check if only one genre was selected
  if (typeof targetUser.favoredGenres !== "object") {
    targetUser.favoredGenres = [targetUser.favoredGenres];
  }
  console.log(targetUser);

  //write changes back to json file
  userData.storeUsers(storedUsers);

  //redirect back to user profile page
  res.redirect("/user-profile/" + userId);
});

router.get("/delete-user/:id", function (req, res) {
  const userId = req.params.id;

  //load all users, stories and chapters
  const storedUsers = userData.getStoredUsers();
  const storedStories = storyData.getStoredStories();
  const storedChapters = chapterData.getStoredChapters();

  //find target user + associated stories/chapters
  const targetUser = storedUsers.find((user) => user.id === userId);
  const targetUserStories = storedStories.filter(
    (story) => story.authorid === userId
  );
  let targetUserChapters = [];
  for (story of targetUserStories) {
    const storyChapters = storedChapters.filter(
      (chapter) => chapter.storyId === story.id
    );
    targetUserChapters = targetUserChapters.concat(storyChapters);
  }

  //delete target chapters, stories and user
  for (chapter of targetUserChapters) {
    chapterData.deleteChapter(chapter.id, storedChapters);
  }
  for (story of targetUserStories) {
    storyData.deleteStory(story.id, storedStories);
  }
  userData.deleteUser(targetUser.id, storedUsers);

  //write updated arrays back to JSON files
  chapterData.storeChapters(storedChapters);
  storyData.storeStories(storedStories);
  userData.storeUsers(storedUsers);

  //redirect back to homepage
  res.redirect("/");
});

module.exports = router;
