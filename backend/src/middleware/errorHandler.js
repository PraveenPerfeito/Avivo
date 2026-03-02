import { logger } from "../config/logger.js";

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;

  logger.error(error.stack || error.message || "Unexpected error");

  if (error.code === "ECONNREFUSED" || error.code === "PROTOCOL_CONNECTION_LOST") {
    return res.status(503).json({
      error: "Service Unavailable",
      message: "Database connection is unavailable"
    });
  }

  return res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : "Request Error",
    message: error.message || "Something went wrong"
  });
};
