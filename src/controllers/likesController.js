import { insertLike, getPosts, getLikes, deslike, getLikeUser, postExists, likesUser } from "../repositories/likesRepository.js";
export async function createLike(req, res) {
    const postId = req.body.id;
    const userId = res.locals.user.id;
    try {
        const {rowCount} = await postExists(postId);
        
        if(rowCount === 0) {
            return res.status(404).send("id not found")
        }
        
        await insertLike(userId, postId)

        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}
export async function getAllLikes (req, res) {
    const userId = res.locals.user.id;
    try {
        const {rows: posts} = await getPosts();
        let allLikes = [];
        for(const post of posts) {
            const {rows: likes} = await getLikes(post, userId);
            allLikes.push({id:post.id, users: likes})
        }
        res.send(allLikes).status(200)
    } catch {
        res.sendStatus(500)
    }
}
export async function getLikesUser (req, res) {
    const userId = res.locals.user.id;
    try {
        const {rows: posts} = await getLikeUser(userId);
        res.send(posts).status(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}
export async function getDeslike (req, res) {
    const postId = req.params.id;
    const userId = res.locals.user.id;
    try {
        const {rowCount} = await likesUser(postId, userId);
        
        if(rowCount === 0) {
            return res.status(404).send("id not found")
        }

        await deslike(postId, userId)
        
        res.sendStatus(204)
    } catch {
        res.sendStatus(500)
    }
}