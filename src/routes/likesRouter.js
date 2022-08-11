import { Router } from "express";

import { createLike } from "../controllers/likesController.js";
const likesRouter = Router();
likesRouter.post("/likes", createLike)
export default likesRouter