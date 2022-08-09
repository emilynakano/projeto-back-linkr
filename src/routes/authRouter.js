import { Router } from "express";
import  {signUp}  from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import {signUpSchema}  from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
// authRouter.post("/", signIn);


export default authRouter;