import db from "../config/db.js"
export function getComment() {
    return db.query(
        `SELECT users."profilePicture", users.name, comments."postId", comments."userId", comments."comment" FROM comments JOIN users ON comments."userId"=users.id ORDER BY comments."createdAt" ASC`
        )
}
export function createComment(id, userId, comment) {
    return db.query(
        `INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3)`, [id, userId, comment]
        )
}
export function postExists(id) {
    return db.query(
        `SELECT * FROM posts WHERE id=$1`, [id]
        )
}