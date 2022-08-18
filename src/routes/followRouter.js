import { Router } from "express";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { followUser } from "../controllers/followController.js";

const followRouter = Router();

followRouter.post("/user/:followedUserId/follow", validateToken, followUser);

export default followRouter;