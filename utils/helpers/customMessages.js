const errorMessages = {
  // list errors
  listNotUnique: "List title must be unique! Try a different one.",
  listDoesntExist: "That list doesn't exist!",
  noTitle: "The list must have a title!",
  noCreator: "There must be a creator of a list!",
  notListCreator: "Seems like this is not your list!",
  invalidId: "Please make sure list ID is correct format!",
  horribleError: "Something went horribly wrong!",

  // user errors
  emailNotUnique: "User with that email already exists.",
  emailDoesntExist: "User with that email doesn't exist.",
  noEmail: "You must enter email!",
  noPassword: "You must enter password!",
  invalidCredentials: "Invalid credentials!",

  // report message
  noLists: "There were no lists created in this period.",

  // auth
  authFailed: "Authetnication failed!",

  // dates
  badDate: "Please enter correct date format: YYYY-MM-DD",
};

const successMessages = {
  // list success
  listUpdated: "List updated successfuly!",
  listDeleted: "List deleted successfuly!",

  // report message
  listsFound: "Here you go.",

  // user success
  paswordChanged: "Password changed successfuly!",
};

module.exports = { errorMessages, successMessages };
