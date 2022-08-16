import { createComment, getComment } from "../repositories/commentsRepository.js"

export async function getComments(req, res) {
    try {
        const {rows: comments} = await getComment();
        res.send(comments)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}
export async function newComment(req, res) {
    const {id, comment} = req.body
    const userId = res.locals.user.id;
    try {
        await createComment(id, userId, comment)
    } catch (error) {
        console.log(error)
        res.send(500)
    }
}