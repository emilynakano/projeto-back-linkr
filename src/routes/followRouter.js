import { Router } from "express";
import { validateToken } from "../middlewares/validadeTokenMiddleware.js";
import { followUser, statusFollow } from "../controllers/followController.js";

const followRouter = Router();

followRouter.post("/user/:id/follow",validateToken, followUser);
followRouter.get("/user/:id/follow",validateToken, statusFollow);

export default followRouter;