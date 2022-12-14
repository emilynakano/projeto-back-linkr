import chalk from "chalk";
import { getFollow, getFollowUser, insertFollow, unfollow , getAllFollowed, getAllFollowedWithReposts } from "../repositories/followRepository.js";
import urlMetadata from 'url-metadata';
import { getReposts } from "../repositories/repostsRepository.js";

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
     try {
        const {rows: follow} = await getFollowUser(userId)
        res.send(follow).status(200)
    } catch {
        res.sendStatus(500)

    }
}

export async function getAllFollows(req,res){
    const {id: userId} = res.locals.user;
    let page = req.query.page;
    if (!page){
        page = 0;
    }
    if (isNaN(Number(page))){
        res.status(400).send("Invalid page!");
        return;
    }
    if (!userId || isNaN(Number(userId))) {
        res.status(400).send("Invalid id!");
        return;
    }
    page = page * 10;
    try {
        //const {rows:posts} = await getAllFollowed(userId);
        const {rows: posts} = await getAllFollowedWithReposts(userId, page);
        const {rows: reposts} = await getReposts()
        const resp = []
        for(const post of posts) {
            try {
                const metadata = await urlMetadata(post.url)
                resp.push({
                    id:post.userId,
                    name: post.name,
                    profilePicture: post.profilePicture, 
                    createdAt: post.createdAt,
                    content: post.content, 
                    isRepost: post.isRepost,
                    ReposterName: post.reposterName,
                    repostLength: reposts.filter((repost) => repost.id === post.postId).length,
                    post: {
                        id:post.postId,
                        title: metadata.title,
                        description: metadata.description,
                        image: metadata.image,
                        url: post.url
                    }  
                })
            } catch {
                resp.push({
                    id:post.userId,
                    name: post.name,
                    profilePicture: post.profilePicture,
                    createdAt: post.createdAt, 
                    content: post.content, 
                    isRepost: post.isRepost,
                    ReposterName: post.reposterName,
                    repostLength: reposts.filter((repost) => repost.id === post.postId).length,
                    post: {
                        id:post.postId,
                        title: null,
                        description: null,
                        image: null,
                        url: post.url
                    }  
                })
            }
        }
        res.status(200).send(resp)
        return;
    } catch (error) {
        console.log(chalk.bold.red(error));
        res.status(500).send({
          message: "Internal server error while get all followed users!",
        });
        return;     
    }
}
           
   