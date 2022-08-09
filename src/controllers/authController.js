import chalk from "chalk";
import bcrypt from"bcrypt";
import dotenv from "dotenv";
import { 
    getUserEmail,
    getUsername,
    createUser
} from "../repositories/authRepository.js";

dotenv.config();

export async function signIn(req,res){}

export async function signUp(req,res){
    const { email, password, username, pictureUrl } = req.body;
    const SALT = 10;

    try {
        const repeatEmail = await getUserEmail(email);
        if (repeatEmail.rowCount > 0){
            res.status(409).send("E-mail already registered!");
            return;
        }
        
        const repeatUsername = await getUsername(username);
        if (repeatUsername.rowCount > 0){
            res.status(409).send("Username already registered!");
            return;
        }

        const hashPassword = bcrypt.hashSync(password,SALT);

        await createUser(email, password, username, pictureUrl);
        
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while register user!",
        });
        return; 
    }
}

