import { postExists, postRepost } from "../repositories/repostsRepository.js";

export async function newRepost (req, res) {
    const reposterName = res.locals.user.name;
    const postId = req.body.id;
    try {

        const {rowCount, rows:post} = await postExists(postId);

        if(rowCount === 0) {
            return res.status(404).send("post id not found");
        }

        const repostUrl = post[0].url 
        const repostContent = post[0].content;
        const posterId = post[0].posterId;
        
        await postRepost(postId, posterId, repostUrl, repostContent, reposterName);

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }
}