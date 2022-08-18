import chalk from "chalk";
import { getFollow, insertFollow, unfollow } from "../repositories/followRepository.js";

export async function followUser(req,res){
    const { followedUserId } = req.params;
    const {id} = res.locals.user;

    if (!followedUserId  || isNaN(Number(followedUserId))) {
        res.status(400).send("Invalid id!");
        return;
    }

    if (parseInt(id)===parseInt(followedUserId)){
        res.status(401).send("User follower and user followed are the same user!");
        return;
    }

    try {
        const follow = await getFollow(id,followedUserId);

        if(follow.rowCount===0){
            await insertFollow(id,followedUserId);
            res.status(200).send("Follow");
            return;
        }else{
            await unfollow(id,followedUserId);
            res.status(200).send("Unfollow");
            return;
        }
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error follow user!",
        });
        return;   
    }
}
