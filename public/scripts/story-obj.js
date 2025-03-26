// story object structure, simplified
function Story(author, title, imageUrl, storyContent) {
  this.author = author;
  this.title = title;
  this.imageUrl = imageUrl;
  this.storyContent = storyContent;
  this.upvoteCount;
  this.viewCount;
  this.lastUpdated;
}

//first names to randomly choose from to generate new author name
const authorFirstNames = [
  "Desmond",
  "Mona",
  "Fidel",
  "Orval",
  "Kathryn",
  "Angela",
  "Millie",
  "Ivan",
  "Christian",
  "Joseph",
  "Carl",
];

//last names to randomly choose from to generate new author name
const authorLastNames = [
  "Hardin",
  "Mora",
  "Mclaughlin",
  "Haynes",
  "Lopez",
  "Gilbert",
  "Walter",
  "Lynn",
  "Turner",
  "Hunter",
  "Baggins",
];

//story titles to randomly choose from when generating new "story objects"
const storyTitles = [
  "Death of the One-Toed Goose",
  "Ark Dying",
  "Claw of Exile",
  "The Shadow in the Dark City",
  "The Demon in the Window",
  "Unleash the Fury",
  "The Fall of the Empire",
  "Shard and the Rose",
];

// list of image sources to be randomly picked when new story is "created"
const storyImageUrls = [
  "/public/images/fantasy-cover.jpg",
  "/public/images/romance-cover.png",
  "/public/images/adventure-cover.png",
];

//"stories" to randomly choose from when creating new "story objects"
const storyContentOptions = [
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum ultrices nostra quis nam consequat " +
    "lobortis vehicula. Mollis proin ridiculus eu eleifend est eget. Euismod dictum accumsan volutpat " +
    "venenatis donec porttitor? Sapien litora turpis cursus egestas aenean. Convallis eros per feugiat " +
    "adipiscing velit, lobortis vitae parturient. Nisi praesent adipiscing pellentesque sem potenti aenean " +
    "metus per. Aliquet dapibus ligula iaculis libero ligula eu parturient? Adipiscing adipiscing volutpat " +
    "fusce; adipiscing donec elit potenti eleifend.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Commodo a nulla tristique odio leo habitasse cubilia. " +
    "Libero tristique sit dui maximus vehicula in per.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Dignissim suspendisse a finibus, torquent sodales odio " +
    "rhoncus. Facilisis sodales tincidunt senectus at enim tortor. Rutrum laoreet pretium; magna lectus turpis quis " +
    "dolor risus primis.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Donec placerat gravida platea imperdiet sollicitudin aliquam." +
    " Netus fusce justo malesuada enim ullamcorper.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium interdum sociosqu venenatis aliquam fusce phasellus " +
    "porta bibendum. Nibh fames himenaeos aptent, faucibus euismod torquent hac. Montes nostra aenean turpis hac erat. " +
    "In hac lacus venenatis, purus sem lacus lacinia suscipit. Montes accumsan ac augue eros tristique ex dis. Sit amet diam ante felis ipsum.",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis tortor class hendrerit sociosqu nullam condimentum " +
    "mi nulla. Ante mollis litora mattis euismod parturient venenatis porta varius? Nibh ultricies tristique enim " +
    "semper nunc eros egestas tellus. Dignissim vel litora mi ultricies orci mollis lacus dictum?",
  "Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra curabitur primis, nullam potenti torquent fringilla.",
];

//all new "story objects" will be stored in this array
const storyListData = [];
