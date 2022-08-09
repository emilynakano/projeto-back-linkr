import { Router } from "express";
import { signIn,signUp } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import signUpSchema  from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/", signIn);
authRouter.post("/sign-up", validateSchema(signUpSchema) ,signUp);


export default authRouter;