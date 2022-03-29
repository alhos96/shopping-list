// this function returns name of field that is causing error so meaningfull error message can be sent

const extractMessage = (err) => {
  // first key in error is field name
  let path = Object.keys(err.errors)[0];

  // extract the message from that specific paths properties
  let message = err.errors[path].properties.message;

  return message;
};

module.exports = extractMessage;
