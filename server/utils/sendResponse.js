const sendResponse = async (
  res,
  statusCode,
  success,
  message,
  data = null,
  errors = null
) => {
  const response = { success, message, data, errors };
  if (!data) delete response.data;
  if (!errors) delete response.errors;
  return res.status(statusCode).json(response);
};

export default sendResponse;
