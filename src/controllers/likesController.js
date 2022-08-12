import { insertLike, getPosts, getLikes } from "../repositories/likesRepository.js";
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
    const {rows: posts} = await getPosts();
    let allLikes = [];
    for(const post of posts) {
        const {rows: likes} = await getLikes(post);
        allLikes.push({id:post.id, users: likes})
    }
    res.send(allLikes)
}