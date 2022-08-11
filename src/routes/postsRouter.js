import { Router } from "express";
import { createPost, getPosts , editPost } from "../controllers/postsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import postSchema from "../schemas/postSchema.js";

const postsRouter = Router();
postsRouter.post('/posts', validateToken, validateSchema(postSchema), createPost);
postsRouter.get('/posts', getPosts);
postsRouter.post('/posts/:id/edit', validateToken, editPost);
export default postsRouter;