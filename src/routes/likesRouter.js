import { Router } from "express";

import { createLike, getAllLikes } from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";

const likesRouter = Router();
likesRouter.post("/likes", validateToken, createLike);
likesRouter.get("/likes", validateToken, getAllLikes)
export default likesRouter