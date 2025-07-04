const fs = require("fs");
const path = require("path");
const storiesFilePath = path.join(__dirname, "..", "data", "stories.json");

function getStoredStories() {
  const storiesFileData = fs.readFileSync(storiesFilePath);
  const storedStories = JSON.parse(storiesFileData);
  return storedStories;
}

function deleteStory(storyId, storedStories) {
  const targetIndex = storedStories.findIndex(
    (storedStory) => storedStory.id === storyId
  );
  storedStories.splice(targetIndex, 1);
}

function storeStories(storeableStories) {
  fs.writeFileSync(storiesFilePath, JSON.stringify(storeableStories));
}

//allows fns to be usable/available to other files
module.exports = {
  getStoredStories: getStoredStories,
  storeStories: storeStories,
  deleteStory: deleteStory,
};
