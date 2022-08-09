import chalk from "chalk";
import { 
    getUserEmail,
    getUsername,
    createUser
} from "../repositories/authRepository.js";


// export async function signIn(req,res){
//     return;
// }

export async function signUp(req,res){
    const { email, password, username, pictureUrl } = req.body;
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

        await createUser(email,password, username, pictureUrl);

        res.sendStatus(201);
        return;   
    // try {
         
        
    // } catch (error) {
    //     console.log(chalk.bold.red("Erro no servidor!"));
    //     res.status(500).send({
    //       message: "Internal server error while register user!",
    //     });
    //     return; 
    // }
}

