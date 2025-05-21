const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

function getStoredUsers() {
  const usersFileData = fs.readFileSync(usersFilePath);
  const storedUsers = JSON.parse(usersFileData);
  return storedUsers;
}

function deleteUser(userId, storedUsers) {
  const targetIndex = storedUsers.findIndex((user) => user.id === userId);
  storedUsers.splice(targetIndex, 1);
}

function storeUsers(storeableUsers) {
  fs.writeFileSync(usersFilePath, JSON.stringify(storeableUsers));
}

module.exports = {
  getStoredUsers: getStoredUsers,
  storeUsers: storeUsers,
  deleteUser: deleteUser,
};
