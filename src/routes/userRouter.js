import { Router } from "express";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { getUserPostsById } from "../controllers/postsController.js";
import { getUsersBySearch } from "../controllers/userController.js";

const router = Router();

router.get("/user/:id", validateToken, getUserPostsById);
router.get("/search/:username", validateToken, getUsersBySearch);

export default router;