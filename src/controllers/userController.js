import chalk from "chalk";
import { getSearchUserByName, getFollow} from "../repositories/userRepository.js"

export async function getUsersBySearch(req, res){

    const { username } = req.params;
    const { id } = res.locals.user;

    try {
        
        const {rows:users} = await getSearchUserByName(username);
        const {rows:follows} = await getFollow(id);
        
        // if(users.length===0){
        //     res.sendStatus(404);
        //     return;
        // }

        users.forEach((user)=>{
            follows.forEach((follow)=>{
                if(user.id===follow.followedUserId){
                    user.follow=true;
                }
            })
        })
        console.log(users);
        res.status(200).send(users);
        return;
    } catch (error) {

        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while searching users!",
        });
        return;

    }

}

