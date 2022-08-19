import { Router } from "express";

import { newRepost } from "../controllers/repostsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";

const repostRouter = Router()

repostRouter.post("/reposts", validateToken, newRepost)

export default repostRouter