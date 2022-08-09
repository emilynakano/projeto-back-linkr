import { Router } from "express";
import { createPost } from "../controllers/postsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
const postsRouter = Router();
postsRouter.post('/posts', validateToken, createPost);
export default postsRouter;