import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { healthRoutes } from "./routes/healthRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./config/logger.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  })
);

app.use(healthRoutes);
app.use(usersRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
