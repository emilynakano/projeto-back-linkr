import { Router } from "express";

import { createLike, getAllLikes, getDeslike, getLikesUser } from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";

const likesRouter = Router();
likesRouter.post("/likes", validateToken, createLike);
likesRouter.get("/likes", validateToken, getAllLikes);
likesRouter.get("/likes/user", validateToken, getLikesUser);
likesRouter.delete("/likes", validateToken, getDeslike);
export default likesRouter