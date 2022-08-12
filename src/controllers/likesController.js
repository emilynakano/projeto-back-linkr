import { insertLike, getPosts, getLikes, deslike } from "../repositories/likesRepository.js";
export async function createLike(req, res) {
    try {
        const postId = req.body.id;
        const userId = res.locals.user.id;
        await insertLike(userId, postId)
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}
export async function getAllLikes (req, res) {
    try {
        const {rows: posts} = await getPosts();
        let allLikes = [];
        for(const post of posts) {
            const {rows: likes} = await getLikes(post);
            allLikes.push({id:post.id, users: likes})
        }
        res.send(allLikes).status(200)
    } catch {
        res.sendStatus(500)
    }
}
export async function getDeslike (req, res) {
    try {
        const postId = req.body.id;
        const userId = res.locals.user.id;
        await deslike(postId, userId)
        res.sendStatus(204)
    } catch {
        res.sendStatus(500)
    }
}