import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { app } from "./app.js";
import { pingDatabase } from "./config/database.js";

const startServer = async () => {
  try {
    await pingDatabase();
    logger.info("Database connection established.");
  } catch (error) {
    logger.error(
      `Database is currently unavailable. API will still boot: ${error.message}`
    );
  }

  app.listen(env.port, () => {
    logger.info(`API listening on http://localhost:${env.port}`);
  });
};

startServer();
