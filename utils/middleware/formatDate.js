const handleError = require("./../helpers/handleError");
const { errorMessages } = require("./../helpers/customMessages");

const dateNotValid = (dOne, dTwo) => {
  // if Date method getDate returns NaN it means its Invalid Date object
  if (!dOne.getDate() || !dTwo.getDate()) {
    return true;
  }

  return false;
};

const formatDate = (req, res, next) => {
  const { fromDate, toDate } = req.params;

  // format dates so they are comparable with mongo timestamps
  let formatFrom = new Date(fromDate);
  let formatTo = new Date(toDate);

  // in case of invalid dates return error
  if (dateNotValid(formatFrom, formatTo)) {
    let error = handleError(res, 400, errorMessages.badDate);

    return next(error);
  }

  // attach formated dates to request
  req.formatedDates = { formatFrom, formatTo };

  next();
};

module.exports = formatDate;
