import { Router } from "express";
import { getComments, newComment } from "../controllers/commentsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js"
import {validateSchema} from "../middlewares/schemaValidatorMiddleware.js"
import commentSchema from "../schemas/commentSchema.js"

const commentRouter = Router();

commentRouter.get("/comments", getComments);
commentRouter.post("/comments", validateToken, validateSchema(commentSchema), newComment);

export default commentRouter;

