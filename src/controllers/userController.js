import getUsersBySearchQuerie from "../repositories/userRepository.js";
import chalk from "chalk";

export async function getUsersBySearch(req, res){

    const { username } = req.params;

    try {
        
        const users = await getUsersBySearchQuerie(username);
        res.status(200).send(users);

    } catch (error) {

        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while searching users!",
        });
        return;

    }

}