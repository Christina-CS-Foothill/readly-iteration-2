/**
 * TODO: Implement JS to home page: add a button that will add new stories to the home page
 * 1. Create + display button
 * 2. Create a list of "Story Objects" that contain all the data needed to fill out a Story element
 * 3. Create story element
 * 5. Fill the story element with the data
 * 6. Display the filled element on the home page
 */

/**
 * TODO: Repeat steps in first todo but for author objects
 * 1. Create + display button
 * 2. Create a list of "Author Objects" that contain all the data needed to fill out a Author element
 * 3. Create story element
 * 5. Fill the author element with the data
 * 6. Display the filled element on the home page
 */

// story object structure, simplified
function Story(title, author, storyContent) {
  this.title = title;
  this.author = author;
  this.storyContent = storyContent;
}

// list of image sources to be randomly picked when new story is "created"
const storyImageList = [
  "/images/fantasy-cover.jpg",
  "/images/romance-cover.png",
  "/images/adventure-cover.png",
];

// list of hardcoded story data to randomly choose from
const storyListData = [
  new Story(
    "Death of the One-Toed Goose",
    "Desmond Hardin",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum ultrices nostra quis nam consequat " +
      "lobortis vehicula. Mollis proin ridiculus eu eleifend est eget. Euismod dictum accumsan volutpat " +
      "venenatis donec porttitor? Sapien litora turpis cursus egestas aenean. Convallis eros per feugiat " +
      "adipiscing velit, lobortis vitae parturient. Nisi praesent adipiscing pellentesque sem potenti aenean " +
      "metus per. Aliquet dapibus ligula iaculis libero ligula eu parturient? Adipiscing adipiscing volutpat " +
      "fusce; adipiscing donec elit potenti eleifend."
  ),
  new Story(
    "Ark Dying",
    "Mona Mora",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo a nulla tristique odio leo habitasse cubilia. " +
      "Libero tristique sit dui maximus vehicula in per."
  ),
  new Story(
    "Claw of Exile",
    "Fidel Mclaughlin",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Dignissim suspendisse a finibus, torquent sodales odio " +
      "rhoncus. Facilisis sodales tincidunt senectus at enim tortor. Rutrum laoreet pretium; magna lectus turpis quis " +
      "dolor risus primis."
  ),
  new Story(
    "The Shadow in the Dark City",
    "Orval Haynes",
    "Lorem ipsum odor amet, consectetuer adipiscing elit."
  ),
  new Story(
    "The Demon in the Window",
    "Kathryn Lopez",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Donec placerat gravida platea imperdiet sollicitudin aliquam." +
      " Netus fusce justo malesuada enim ullamcorper."
  ),
  new Story(
    "Unleash the Fury",
    "Angela Gilbert",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium interdum sociosqu venenatis aliquam fusce phasellus " +
      "porta bibendum. Nibh fames himenaeos aptent, faucibus euismod torquent hac. Montes nostra aenean turpis hac erat. " +
      "In hac lacus venenatis, purus sem lacus lacinia suscipit. Montes accumsan ac augue eros tristique ex dis. Sit amet diam ante felis ipsum."
  ),
  new Story(
    "The Fall of the Empire",
    "Millie Walter",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis tortor class hendrerit sociosqu nullam condimentum " +
      "mi nulla. Ante mollis litora mattis euismod parturient venenatis porta varius? Nibh ultricies tristique enim " +
      "semper nunc eros egestas tellus. Dignissim vel litora mi ultricies orci mollis lacus dictum?"
  ),
  new Story(
    "Shard and the Rose",
    "Ivan Lynn",
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra curabitur primis, nullam potenti torquent fringilla."
  ),
];

// DOM elements
const showStoriesBtn = document.getElementById("show-stories-btn");
const showAuthorsBtn = document.getElementById("show-authors-btn");
const addNewStoryBtn = document.getElementById("add-new-story-btn");
const storiesSectionElement = document.getElementById("story-list");
const listOfStoriesElement = document.body.querySelector(".list-of-stories");
const authorsList = document.getElementById("author-list");

//toggle story list visibility
function showStories(event) {
  storiesSectionElement.style.display = "block";
  authorsList.style.display = "none";
}

//toggle author list visibility
function showAuthors(event) {
  storiesSectionElement.style.display = "none";
  authorsList.style.display = "block";
}

//add new story to DOM with randomly selected story data
function addNewStory(event) {
  const randomStoryIndex = Math.floor(Math.random() * storyListData.length);
  const randomImageIndex = Math.floor(Math.random() * storyImageList.length);
  const upvoteCount = Math.floor(Math.random() * 200);
  const viewCount = Math.floor(Math.random() * 2000);
  const todayDate = new Date().toDateString();

  const listContainer = document.createElement("li");
  const article = document.createElement("article");
  const storyDetailsContainer = document.createElement("div");
  const storyImage = document.createElement("img");
  const innerDiv = document.createElement("div");
  const storyTitle = document.createElement("h2");
  const storyAuthor = document.createElement("p");
  const lastUpdated = document.createElement("p");
  const storyContent = document.createElement("p");
  const upvotesAndViewsContainer = document.createElement("div");
  const upvotes = document.createElement("p");
  const views = document.createElement("p");

  listContainer.className = "story-list-item";
  storyDetailsContainer.className = "story-details";
  storyImage.src = storyImageList[randomImageIndex];
  upvotesAndViewsContainer.className = "upvotes-views";
  views.innerText = "👀 views: " + viewCount;
  upvotes.innerText = "❤️ upvotes: " + upvoteCount;
  storyTitle.innerText = storyListData[randomStoryIndex].title;
  storyAuthor.innerText = storyListData[randomStoryIndex].author;
  lastUpdated.innerText = "Last Updated: " + todayDate;
  storyContent.innerText = storyListData[randomStoryIndex].storyContent;

  innerDiv.appendChild(storyTitle);
  innerDiv.appendChild(storyAuthor);
  innerDiv.appendChild(lastUpdated);
  innerDiv.appendChild(storyContent);
  upvotesAndViewsContainer.appendChild(views);
  upvotesAndViewsContainer.appendChild(upvotes);
  storyDetailsContainer.appendChild(storyImage);
  storyDetailsContainer.appendChild(innerDiv);
  article.appendChild(storyDetailsContainer);
  article.appendChild(upvotesAndViewsContainer);
  listContainer.appendChild(article);
  listOfStoriesElement.appendChild(listContainer);
}

for (let i = 0; i < 4; i++) {
  addNewStory();
}

showStoriesBtn.addEventListener("click", showStories);
showAuthorsBtn.addEventListener("click", showAuthors);
addNewStoryBtn.addEventListener("click", addNewStory);
