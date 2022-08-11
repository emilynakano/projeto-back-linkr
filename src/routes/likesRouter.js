import { Router } from "express";

import { createLike } from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";

const likesRouter = Router();
likesRouter.post("/likes", validateToken, createLike)
export default likesRouter