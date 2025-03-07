/**
 * TODO: Implement JS to home page: add a button that will add new stories to the home page
 * 1. Create + display button
 * 2. Create a list of "Story Objects" that contain all the data needed to fill out a Story element
 * 3. Create story element
 * 5. Fill the story element with the data
 * 6. Display the filled element on the home page
 */

const showStoriesBtn = window.document.getElementById("show-stories-btn");
const showAuthorsBtn = window.document.getElementById("show-authors-btn");
const storiesList = window.document.getElementById("story-list");
const authorsList = window.document.getElementById("author-list");

//toggle story list visibility
function showStories(event) {
  storiesList.style.display = "block";
  authorsList.style.display = "none";
}

//toggle author list visibility
function showAuthors(event) {
  storiesList.style.display = "none";
  authorsList.style.display = "block";
}

showStoriesBtn.addEventListener("click", showStories);
showAuthorsBtn.addEventListener("click", showAuthors);
