const handleError = require("./handleError");
const { errorMessages } = require("./customMessages");

const dateNotValid = (dOne, dTwo) => {
  // if Date method getDate returns NaN it means its Invalid Date object
  if (!dOne.getDate() || !dTwo.getDate()) {
    return true;
  }

  return false;
};

const formatDate = (fromDate, toDate, res) => {
  // format dates so they are comparable with mongo timestamps
  let formatFrom = new Date(fromDate);
  let formatTo = new Date(toDate);

  // in case of invalid dates throw error
  if (dateNotValid(formatFrom, formatTo)) {
    throw new Error(errorMessages.badDate);
  }

  return { formatFrom, formatTo };
};

module.exports = formatDate;
