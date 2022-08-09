import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import tokenSchema from "../schemas/tokenSchema.js";
import {getUserByUsername} from "../repositories/userRepository.js";
import chalk from "chalk";

dotenv.config();

export async function validateToken(req,res,next){
    const { authorization } = req.headers;
    
    try {
        const token = authorization?.replace("Bearer ", "").trim();

        if(!token){
            res.status(401).send("No token!");
            return;
        }

        const validation = await tokenSchema.validateAsync(token);
        const secretKey = process.env.JWT_KEY??'JWT_SECRET';

        const userValidation = jwt.verify(validation,secretKey);
        const {rows: users}= await getUserByUsername(userValidation.username);
        const [user]=users;

        if (!user){
            res.send(401).send("User not found.");
            return;
        }

        delete userValidation.iat;

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error)
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while validate token!",
        });
    }
}