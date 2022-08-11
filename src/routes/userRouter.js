import { Router } from "express";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { getUserPostsById } from "../controllers/postsController.js";

const router = Router();

router.get("/user/:id", validateToken, getUserPostsById);

export default router;