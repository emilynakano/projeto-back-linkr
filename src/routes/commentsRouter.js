import { Router } from "express";
import { getComments, newComment } from "../controllers/commentsController.js";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js"
import {validateSchema} from "../middlewares/schemaValidatorMiddleware.js"
import commentSchema from "../schemas/commentSchema.js"

const commentRouter = Router();

commentRouter.get("/comments", getComments);
<<<<<<< HEAD
commentRouter.post("/comments", validateToken, validateSchema(commentSchema), newComment);

export default commentRouter;
=======
commentRouter.post("/comments", validateToken, validateSchema(commentSchema), newComment)

export default commentRouter
>>>>>>> 61abc3b0c87a077e3a670fe3752f859909884543
