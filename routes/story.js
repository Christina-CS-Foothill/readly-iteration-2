const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const userData = require("../util/user-data");
const storyData = require("../util/story-data");
const chapterData = require("../util/chapter-data");

router.get("/new-story/:id", function (req, res) {
  const userId = req.params.id;
  res.render("new-story", { userId: userId });
});

router.post("/new-story", function (req, res) {
  const newStory = req.body;
  console.log(newStory);
  newStory.id = uuid.v4();
  newStory.createdDate = new Date().toDateString();

  let upvoteCount = Math.floor(Math.random() * 200);
  let viewCount = Math.floor(Math.random() * 2000);
  //also, use the given authorId to fetch the authorName, save it to new story object
  const storedUsers = userData.getStoredUsers();
  const user = storedUsers.find((user) => user.id === newStory.authorid);

  //add relevant data fields to new story obj
  newStory.authorname = user.username;
  newStory.upvotecount = upvoteCount;
  newStory.viewcount = viewCount;

  //check if only one genre was selected
  if (typeof newStory.genre !== "object") {
    newStory.genre = [newStory.genre];
  }

  //retrieve saved list of stories
  const storedStories = storyData.getStoredStories();

  //add new story obj to saved list of stories
  console.log(newStory);
  storedStories.push(newStory);
  //update story data/json file
  storyData.storeStories(storedStories);

  res.redirect("/story/" + newStory.id);
});

router.get("/edit-story/:id", function (req, res) {
  //here, display the story + the associated chapters
  const storyId = req.params.id;

  const storedStories = storyData.getStoredStories();
  const targetStory = storedStories.find((story) => story.id === storyId);

  const storedChapters = chapterData.getStoredChapters();
  const targetChapters = storedChapters.filter(
    (chapter) => chapter.storyId === storyId
  );

  res.render("edit-story", { story: targetStory, chapters: targetChapters });
});

router.post("/edit-story/:id", function (req, res) {
  const storyId = req.params.id;
  const newStoryTitle = req.body.storytitle;
  const newStoryGenreList = req.body.genre;
  const newStoryImageUrl = req.body.imageurl;
  const newStorySummary = req.body.storysummary;

  const storedStories = storyData.getStoredStories();
  const targetStory = storedStories.find((story) => story.id === storyId);

  //update the story data
  targetStory.storytitle = newStoryTitle;
  if (typeof newStoryGenreList === "object") {
    targetStory.genre = newStoryGenreList;
  } else {
    targetStory.genre = [newStoryGenreList];
  }
  targetStory.imageurl = newStoryImageUrl;
  targetStory.storysummary = newStorySummary;

  //save it to JSON file
  storyData.storeStories(storedStories);

  //then redirect to story page to see the changes
  res.redirect("/story/" + storyId);
});

router.get("/story/:id", function (req, res) {
  //here, display the story + the associated chapters
  const storyId = req.params.id;

  const storedStories = storyData.getStoredStories();
  const targetStory = storedStories.find((story) => story.id === storyId);

  const storedChapters = chapterData.getStoredChapters();
  const targetChapters = storedChapters.filter(
    (chapter) => chapter.storyId === storyId
  );

  // console.log(targetStory);
  // console.log(targetChapters);

  res.render("story", { story: targetStory, chapters: targetChapters });
});

router.get("/delete-story/:id", function (req, res) {
  const storyId = req.params.id;

  //load all stories and chapters
  const storedStories = storyData.getStoredStories();
  const storedChapters = chapterData.getStoredChapters();

  //find target story and associated chapters
  const targetStory = storedStories.find((story) => story.id === storyId);
  const targetChapters = storedChapters.filter(
    (chapter) => chapter.storyId === storyId
  );

  //delete story and associated chapters
  for (targetChapter of targetChapters) {
    chapterData.deleteChapter(targetChapter.id, storedChapters);
  }
  storyData.deleteStory(targetStory.id, storedStories);

  //rewrite updated data to json files
  storyData.storeStories(storedStories);
  chapterData.storeChapters(storedChapters);

  //redirect to user profile since story no longer exists
  const authorId = targetStory.authorid;
  res.redirect("/user-profile/" + authorId);
});

module.exports = router;
