import { Router } from "express";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { followUser, getFollowsUser, statusFollow, getAllFollows } from "../controllers/followController.js";

const followRouter = Router();

followRouter.post("/user/:id/follow",validateToken, followUser);
followRouter.get("/user/:id/follow",validateToken, statusFollow);
followRouter.get("/follow/user", validateToken, getFollowsUser);
followRouter.get("/follows",validateToken, getAllFollows);

export default followRouter;