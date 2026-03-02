import { pingDatabase } from "../config/database.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { findAllUsers } from "../models/usersModel.js";
import { validateUsersResponse } from "../utils/responseValidator.js";

export const getHealth = asyncHandler(async (_req, res) => {
  await pingDatabase();
  res.status(200).json({ status: "ok" });
});

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await findAllUsers();
  const response = {
    users,
    total: users.length
  };

  const isValid = validateUsersResponse(response);
  if (!isValid) {
    const err = new Error("Generated response does not match required user schema");
    err.statusCode = 500;
    throw err;
  }

  res.status(200).json(response);
});
