import { createComment, getComment, postExists } from "../repositories/commentsRepository.js"

export async function getComments(req, res) {
    try {
        const {rows: comments} = await getComment();
        res.status(200).send(comments)
    } catch {
        res.sendStatus(500)
    }
}
export async function newComment(req, res) {
    const {id, comment} = req.body
    const userId = res.locals.user.id;
    
    try {
        const {rowCount} = await postExists(id);

        if(rowCount === 0) {
            return res.status(404).send("id not found")
        }

        await createComment(id, userId, comment)

        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        res.send(500)
    }
}