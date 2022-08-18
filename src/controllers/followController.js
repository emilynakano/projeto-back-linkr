import chalk from "chalk";
import { getFollow, insertFollow, unfollow } from "../repositories/followRepository.js";

export async function followUser(req,res){
    const { id:followedUserId } = req.params;
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
            res.status(200).send("Unfollow");
            return;
        }else{
            await unfollow(id,followedUserId);
            res.status(200).send("Follow");
            return;
        }
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while follow user!",
        });
        return;   
    }
}

export async function statusFollow(req,res){
    const { id:followedUserId } = req.params;
    const {id} = res.locals.user;

    if (!followedUserId  || isNaN(Number(followedUserId))) {
        res.status(400).send("Invalid id!");
        return;
    }

    try {

        const follow = await getFollow(id,followedUserId);
        
        res.status(200).send(follow.rows[0]);
        return;

    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while get follow user status!",
        });
        return;      
    }
}
export async function getFollowsUser(req, res) {
    const userId = res.locals.user.id;
    console.log(userId)
    const { rows: followeds } = await getFollow(userId)
    res.send(followeds).status(200)
}