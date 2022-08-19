import { postExists, postRepost } from "../repositories/repostsRepository.js";

export async function newRepost (req, res) {
    const userId = res.locals.user.id;
    const postId = req.body.id;
    try {

        const post = await postExists(postId);

        if(post.rowCount === 0) {
            return res.status(404).send("post id not found");
        }

        await postRepost(postId, userId);

        res.sendStatus(201)
    } catch (error) {
        console.log(error)
    }
}