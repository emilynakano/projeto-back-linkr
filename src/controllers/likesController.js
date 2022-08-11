import { insertLike } from "../repositories/likesRepository.js";
export async function createLike(req, res) {
    const postId = req.body.id;
    const userId = res.locals.user.id;
    await insertLike(userId, postId)
    res.send("userId")
}