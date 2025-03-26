/**
 * TODO: Implement JS to home page: add a button that will add new stories to the home page
 * 1. Create + display button [x]
 * 2. Create a list of "Story Objects" that contain all the data needed to fill out a Story element [x]
 * 3. Create story element [x]
 * 5. Fill the story element with the data [x]
 * 6. Display the filled element on the home page [x]
 */

/**
 * TODO: Repeat steps in first todo but for author objects
 * 1. Create + display button [x]
 * 2. Create a list of "Author Objects" that contain all the data needed to fill out a Author element [x]
 * 3. Create author element [x]
 * 5. Fill the author element with the data [x]
 * 6. Display the filled element on the home page [x]
 */

// author object structure, simplified
function Author(authorName, authorAt, introShort, introLong, favoredGenres) {
  this.authorName = authorName;
  this.authorAt = authorAt;
  this.dateJoined = new Date().toDateString();
  this.introShort = introShort;
  this.introLong = introLong;
  this.workCount = 0;
  this.favoredGenres = favoredGenres;
  this.followerCount = 0;
  this.followingCount = 0;
}

// list of hardcoded author data to randomly choose from
const authorListData = [
  new Author(
    (authorName = "Desmond Hardin"),
    (authorAt = "@Desmond_Hardin"),
    (introShort = "Hi my name is Desmond and I love to write romance stories!"),
    (introLong =
      "Hi my name is Desmond and I love to write romance stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Romace", "Drama", "Angst"])
  ),
  new Author(
    (authorName = "Mona Mora"),
    (authorAt = "@Mona_Mora"),
    (introShort = "Hi my name is Mona and I love to write action stories!"),
    (introLong =
      "Hi my name is Mona and I love to write action stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Action", "Comedy", "Romance"])
  ),
  new Author(
    (authorName = "Fidel Mclaughlin"),
    (authorAt = "@Fidel_Mclaughlin"),
    (introShort = "Hi my name is Fidel and I love to write comedy stories!"),
    (introLong =
      "Hi my name is Fidel and I love to write comedy stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Comedy", "Action", "Drama"])
  ),
  new Author(
    (authorName = "Orval Haynes"),
    (authorAt = "@Orval_Haynes"),
    (introShort = "Hi my name is Orval and I love to write fantasy stories!"),
    (introLong =
      "Hi my name is Orval and I love to write fantasy stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Fantasy", "Action", "Drama"])
  ),
  new Author(
    (authorName = "Kathryn Lopez"),
    (authorAt = "@Kathryn_Lopez"),
    (introShort = "Hi my name is Kathryn and I love to write horror stories!"),
    (introLong =
      "Hi my name is Kathryn and I love to write horror stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Horror", "Drama", "Angst"])
  ),
  new Author(
    (authorName = "Angela Gilbert"),
    (authorAt = "@Angela_Gilbert"),
    (introShort = "Hi my name is Angela and I love to write action stories!"),
    (introLong =
      "Hi my name is Angela and I love to write action stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Action", "Angst", "Drama"])
  ),
  new Author(
    (authorName = "Millie Walter"),
    (authorAt = "@Millie_Walter"),
    (introShort = "Hi my name is Millie and I love to write drama stories!"),
    (introLong =
      "Hi my name is Millie and I love to write drama stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Drama", "Angst", "Romance"])
  ),
  new Author(
    (authorName = "Ivan Lynn"),
    (authorAt = "@Ivan_Lynn"),
    (introShort = "Hi my name is Ivan and I love to write romance stories!"),
    (introLong =
      "Hi my name is Ivan and I love to write romance stories! Lorem ipsum odor amet, consectetuer adipiscing elit. Nisl a urna egestas eget non nullam. Sed phasellus enim conubia; interdum senectus curae faucibus. Mattis etiam laoreet porta justo consectetur felis rhoncus tellus."),
    (favoredGenres = ["Romance", "Drama", "Action"])
  ),
];

// DOM elements
const showStoriesBtn = document.getElementById("show-stories-btn");
const showAuthorsBtn = document.getElementById("show-authors-btn");
const addNewStoryBtn = document.getElementById("add-new-story-btn");
const addNewAuthorBtn = document.getElementById("add-new-author-btn");
const storiesSectionElement = document.getElementById("story-list");
const authorsSectionElemnt = document.getElementById("author-list");
const listOfStoriesElement = document.body.querySelector(".list-of-stories");
const listOfAuthorsElement = document.body.querySelector(".list-of-authors");

//toggle story list visibility
function showStories(event) {
  storiesSectionElement.style.display = "block";
  authorsSectionElemnt.style.display = "none";
}

//toggle author list visibility
function showAuthors(event) {
  storiesSectionElement.style.display = "none";
  authorsSectionElemnt.style.display = "block";
}

//add new story to DOM with randomly selected story data
function addNewStory(event) {
  const randomAuthorFirstNameIndex = Math.floor(
    Math.random() * authorFirstNames.length
  );
  const randomAuthorLastNameIndex = Math.floor(
    Math.random() * authorLastNames.length
  );
  const randomTitleIndex = Math.floor(Math.random() * storyTitles.length);
  const randomImageUrlIndex = Math.floor(Math.random() * storyImageUrls.length);
  const randomStoryContentIndex = Math.floor(
    Math.random() * storyContentOptions.length
  );
  const upvoteCount = Math.floor(Math.random() * 200);
  const viewCount = Math.floor(Math.random() * 2000);
  const todayDate = new Date().toDateString();

  //construct new "story object" here
  const authorName =
    authorFirstNames[randomAuthorFirstNameIndex] +
    " " +
    authorLastNames[randomAuthorLastNameIndex];
  const newStoryObj = new Story(
    authorName,
    storyTitles[randomTitleIndex],
    storyImageUrls[randomImageUrlIndex],
    storyContentOptions[randomStoryContentIndex]
  );
  newStoryObj.upvoteCount = upvoteCount;
  newStoryObj.viewCount = viewCount;
  newStoryObj.lastUpdated = todayDate;

  //add new "story objects" to storyDataList
  storyListData.push(newStoryObj);
  console.log(storyListData);

  //create sub html elements
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

  //add class names & values
  listContainer.className = "story-list-item";
  storyDetailsContainer.className = "story-details";
  storyImage.src = newStoryObj.imageUrl;
  upvotesAndViewsContainer.className = "upvotes-views";
  views.innerText = "👀 views: " + newStoryObj.viewCount;
  upvotes.innerText = "❤️ upvotes: " + newStoryObj.upvoteCount;
  storyTitle.innerText = newStoryObj.title;
  storyAuthor.innerText = newStoryObj.author;
  lastUpdated.innerText = "Last Updated: " + todayDate;
  storyContent.innerText = newStoryObj.storyContent;

  //build element
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

  //add to DOM
  listOfStoriesElement.appendChild(listContainer);
}

//add new author to DOM with randomly selected author data
function addNewAuthor(event) {
  const randomAuthorIndex = Math.floor(Math.random() * authorListData.length);
  const workCount = Math.floor(Math.random() * 14 + 1);
  authorListData[randomAuthorIndex].workCount = workCount;
  const followerCount = Math.floor(Math.random() * 200);
  authorListData[randomAuthorIndex].followerCount = followerCount;
  const followingCount = Math.floor(Math.random() * 500);
  authorListData[randomAuthorIndex].followingCount = followingCount;

  //create sub html elements
  const listContainer = document.createElement("li");
  const article = document.createElement("article");
  const clickableContainer = document.createElement("a");
  const authorNameSpan = document.createElement("span");
  const authorAtSpan = document.createElement("span");
  const dateJoinedH5 = document.createElement("h5");
  const authorIntroDiv = document.createElement("div");
  const toggleIntroBtn = document.createElement("button");
  const briefIntroPar = document.createElement("p");
  const longIntroPar = document.createElement("p");
  const workInfoDiv = document.createElement("div");
  const workCountPar = document.createElement("p");
  const favoredGenresPar = document.createElement("p");
  const favoredGenresListContainer = document.createElement("ul");
  let favoredGenresListItem;
  const followDiv = document.createElement("div");
  const followerPar = document.createElement("p");
  const followingPar = document.createElement("p");

  //add class names
  listContainer.className = "author-list-item";
  authorNameSpan.className = "author-name";
  authorAtSpan.className = "author-at";
  dateJoinedH5.className = "date-author-joined";
  authorIntroDiv.className = "author-intro-div";
  toggleIntroBtn.className = "home-page-btn";
  briefIntroPar.className = "brief-intro";
  longIntroPar.className = "long-intro";
  workInfoDiv.className = "work-info-div";
  followDiv.className = "follow-div";

  //add content/values
  clickableContainer.href = "user-profile.html";
  authorNameSpan.textContent = authorListData[randomAuthorIndex].authorName;
  authorAtSpan.textContent =
    " (" + authorListData[randomAuthorIndex].authorAt + ")";
  dateJoinedH5.textContent =
    "Date Joined: " + authorListData[randomAuthorIndex].dateJoined;
  toggleIntroBtn.textContent = "Author Introduction:";
  briefIntroPar.textContent = authorListData[randomAuthorIndex].introShort;
  longIntroPar.textContent = authorListData[randomAuthorIndex].introLong;
  workCountPar.textContent =
    "# of Works: " + authorListData[randomAuthorIndex].workCount;
  favoredGenresPar.textContent = "Favored genres:";
  //add genre items using for loop
  for (
    let i = 0;
    i < authorListData[randomAuthorIndex].favoredGenres.length;
    i++
  ) {
    favoredGenresListItem = document.createElement("li");
    favoredGenresListItem.textContent =
      authorListData[randomAuthorIndex].favoredGenres[i];
    favoredGenresListContainer.appendChild(favoredGenresListItem);
  }
  followerPar.textContent =
    "Followers: " + authorListData[randomAuthorIndex].followerCount;
  followingPar.textContent =
    "Following: " + authorListData[randomAuthorIndex].followingCount;

  //build element
  listContainer.appendChild(article);
  article.appendChild(clickableContainer);
  clickableContainer.appendChild(authorNameSpan);
  clickableContainer.appendChild(authorAtSpan);
  article.appendChild(dateJoinedH5);
  authorIntroDiv.appendChild(toggleIntroBtn);
  authorIntroDiv.appendChild(briefIntroPar);
  authorIntroDiv.appendChild(longIntroPar);
  article.appendChild(authorIntroDiv);
  workInfoDiv.appendChild(workCountPar);
  workInfoDiv.appendChild(favoredGenresPar);
  workInfoDiv.appendChild(favoredGenresListContainer);
  article.appendChild(workInfoDiv);
  followDiv.appendChild(followerPar);
  followDiv.appendChild(followingPar);
  article.appendChild(followDiv);

  //add to DOM
  listOfAuthorsElement.appendChild(listContainer);
}

for (let i = 0; i < 3; i++) {
  addNewStory();
  addNewAuthor();
}

showStoriesBtn.addEventListener("click", showStories);
showAuthorsBtn.addEventListener("click", showAuthors);
addNewStoryBtn.addEventListener("click", addNewStory);
addNewAuthorBtn.addEventListener("click", addNewAuthor);
