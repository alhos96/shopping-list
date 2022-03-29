const handleError = (res, code, message) => {
  res.status(code).json({ error: { message } });

  let error = new Error(message);

  return error;
};

module.exports = handleError;
