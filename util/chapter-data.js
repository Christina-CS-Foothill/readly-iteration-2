const fs = require("fs");
const path = require("path");
const chaptersFilePath = path.join(__dirname, "..", "data", "chapters.json");

function getStoredChapters() {
  const chaptersFileData = fs.readFileSync(chaptersFilePath);
  const storedChapters = JSON.parse(chaptersFileData);
  return storedChapters;
}

function deleteChapter(chapterId, storedChapters) {
  //find index of the target chapter to delete
  const targetIndex = storedChapters.findIndex(
    (chapter) => chapter.id === chapterId
  );
  //delete it using splice
  storedChapters.splice(targetIndex, 1);
}

function storeChapters(storeableChapters) {
  fs.writeFileSync(chaptersFilePath, JSON.stringify(storeableChapters));
}

module.exports = {
  getStoredChapters: getStoredChapters,
  storeChapters: storeChapters,
  deleteChapter: deleteChapter,
};
