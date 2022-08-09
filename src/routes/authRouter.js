import { Router } from "express";
import  {signUp, signIn}  from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidatorMiddleware.js";
import {signUpSchema, signInSchema}  from "../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/", validateSchema(signInSchema),signIn);


export default authRouter;