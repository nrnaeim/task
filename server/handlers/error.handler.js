import sendResponse from "../utils/sendResponse.js";

const errorHandler = async (error, req, res, next) => {
  console.log(error);
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    return sendResponse(res, 400, false, "Validation failed", null, errors);
  }

  if (error.name === "CastError") {
    return sendResponse(res, 400, false, "Invalid data", null, null);
  }
  return sendResponse(res, 500, false, "Internal server error", null, null);
};
export default errorHandler;
