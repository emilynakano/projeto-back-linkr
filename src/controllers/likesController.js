import { insertLike } from "../repositories/likesRepository.js";
export async function createLike(req, res) {
    try {
        const postId = req.body.id;
        const userId = res.locals.user.id;
        await insertLike(userId, postId)
        res.send(200)
    } catch {
        res.sendStatus(500)
    }
}