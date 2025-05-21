const express = require("express");
const router = express.Router();

const storyData = require("../util/story-data");
const userData = require("../util/user-data");

router.get("/", function (req, res) {
  const storedStories = storyData.getStoredStories();
  const storedUsers = userData.getStoredUsers();

  res.render("index", { stories: storedStories, users: storedUsers });
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
