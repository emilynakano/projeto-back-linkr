import chalk from "chalk";
import { 
    getUserByEmail,
    getUsername,
    createUser
} from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export async function signIn(req,res){
    const {email, password} = req.body;

    try {
        const { rows:users } = await getUserByEmail(email);
        const [user]=users;
        if (!user){
            res.status(401).send("Unregistered e-mail!");
            return;
        }
        if(user && bcrypt.compareSync(password,user.password)){
            const secretKey = process.env.JWT_SCRET;
            const data ={
                id:user.id,
                username:user.name
            };
            const token = jwt.sign(data, secretKey);
            const profilePicture = user.profilePicture;

            res.status(200).send({token,profilePicture});
            return;
        }
        res.status(401).send("Incorrect password!");
        return;
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while login!",
        });
        return;
    }
}

export async function signUp(req,res){
    const { email, password, username, pictureUrl } = req.body;
    
          
    try {
        const repeatEmail = await getUserByEmail(email);
        if (repeatEmail.rowCount > 0){
            res.status(409).send("E-mail already registered!");
            return;
        }
        
        const repeatUsername = await getUsername(username);
        if (repeatUsername.rowCount > 0){
            res.status(409).send("Username already registered!");
            return;
        }

        await createUser(email,password, username, pictureUrl);

        res.sendStatus(201);
        return; 
        
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while register user!",
        });
        return; 
    }
}
