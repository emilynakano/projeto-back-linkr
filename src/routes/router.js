import { Router } from "express";
import authRouter from "./authRouter.js";
import postsRouter from "./postsRouter.js";
import userRouter from "./userRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(userRouter);
router.use(likesRouter);

export default router;