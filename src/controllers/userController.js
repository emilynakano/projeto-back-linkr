import chalk from "chalk";
import { getSearchUserByName, getFollow} from "../repositories/userRepository.js"

export async function getUsersBySearch(req, res){

    const { username } = req.params;
    const { id } = res.locals.user;

    try {
        
        const users = await getUsersBySearchOrdered(username, id);
        
        if(users.length===0){
            res.sendStatus(404);
            return;
        }
        res.status(200).send(users.rows);
        return;
    } catch (error) {

        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while searching users!",
        });
        return;

    }

}

export async function getUsersBySearchOrdered (username,id){
    const name = username +'%';
    
    try {
        const {rows:users} = await getSearchUserByName(name);
        for (let i=0;i<users.length;i++){
            const {rows:[follow]} = await getFollow(users[i].id,id);
            if (follow) {
                users[i].following = true;
            } else {
                users[i].following = false;
            }
        }
    
        users.sort((a, b) => {
            if (a.following && !b.following) {
                return -1;
            } else if (!a.following && b.following) {
                return 1;
            } else {
                return 0;
            }
        });
    
        return users;
        
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while searching users!",
        });
        return;    
    }
}