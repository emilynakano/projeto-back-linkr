import { Router } from "express";
import { createPost, getPosts, editPost, deletePost, getPostsByHashtag} from "../controllers/postsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import postSchema from "../schemas/postSchema.js";
import { getTrendings } from "../controllers/trendingsController.js";

const postsRouter = Router();
postsRouter.post('/posts', validateToken, validateSchema(postSchema), createPost);
postsRouter.get('/posts', validateToken, getPosts);
postsRouter.post('/posts/:id/edit', validateToken, editPost);
postsRouter.delete('/posts/:id', validateToken, deletePost);
postsRouter.get('/trendings', validateToken, getTrendings);
postsRouter.get('/hashtag/:hashtag', validateToken, getPostsByHashtag);
export default postsRouter;