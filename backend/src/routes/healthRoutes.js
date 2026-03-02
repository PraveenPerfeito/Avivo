import { Router } from "express";
import { getHealth } from "../controllers/usersController.js";

const router = Router();

router.get("/health", getHealth);

export const healthRoutes = router;
