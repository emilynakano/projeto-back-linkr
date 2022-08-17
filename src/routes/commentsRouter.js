import { Router } from "express";
import { getComments, newComment } from "../controllers/commentsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js"
const commentRouter = Router();
commentRouter.get("/comments", getComments);
commentRouter.post("/comments", validateToken, newComment)
export default commentRouter
