const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const storyData = require("../util/story-data");
const chapterData = require("../util/chapter-data");

router.get("/new-chapter/:id", function (req, res) {
  const storyId = req.params.id;

  const storedStories = storyData.getStoredStories();

  const targetStory = storedStories.find((story) => story.id === storyId);

  res.render("new-chapter", { story: targetStory });
});

router.post("/new-chapter", function (req, res) {
  const newChapter = req.body;
  const storyId = req.body.storyId;
  newChapter.id = uuid.v4();
  newChapter.createdDate = new Date().toDateString();

  const storedChapters = chapterData.getStoredChapters();
  storedChapters.push(newChapter);
  chapterData.storeChapters(storedChapters);

  res.redirect("/story/" + storyId);
});

router.get("/edit-chapter/:id", function (req, res) {
  const chapterId = req.params.id;
  const storedChapters = chapterData.getStoredChapters();
  const targetChapter = storedChapters.find(
    (chapter) => chapter.id === chapterId
  );

  res.render("edit-chapter", { chapter: targetChapter });
});

router.post("/edit-chapter/:id", function (req, res) {
  const chapterId = req.params.id;
  //load total list of chapter objs
  const storedChapters = chapterData.getStoredChapters();

  //find target chapter to edit
  const targetChapter = storedChapters.find(
    (chapter) => chapter.id === chapterId
  );

  //update target chapter attributes with user input
  targetChapter.chapterTitle = req.body.chapterTitle;
  targetChapter.chapterSummary = req.body.chapterSummary;
  targetChapter.chapterContent = req.body.chapterContent;

  //write changes back into the JSON file
  chapterData.storeChapters(storedChapters);

  const storyId = targetChapter.storyId;
  res.redirect("/story/" + storyId);
});

router.get("/delete-chapter/:storyId/:chapterId", function (req, res) {
  const chapterId = req.params.chapterId;
  const storyId = req.params.storyId;

  //load all chapters
  const storedChapters = chapterData.getStoredChapters();

  //delete
  chapterData.deleteChapter(chapterId, storedChapters);

  //write edited chapter list back to json
  chapterData.storeChapters(storedChapters);

  //redirect to story page
  res.redirect("/story/" + storyId);
});

module.exports = router;
