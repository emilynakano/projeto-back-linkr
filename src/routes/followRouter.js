import { Router } from "express";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { followUser, statusFollow } from "../controllers/followController.js";

const followRouter = Router();

followRouter.post("/user/:followedUserId/follow",validateToken, followUser);
followRouter.get("/user/:followedUserId/follow",validateToken, statusFollow);

export default followRouter;