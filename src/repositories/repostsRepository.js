import db from "../config/db.js";

export async function postRepost (postId, posterId, repostUrl, repostContent, reposterName) {
    return repostContent ? 
    db.query(
        `INSERT INTO reposts (id, "posterId", url, content, "reposterName") VALUES ($1, $2, $3, $4, $5)`, [postId, posterId, repostUrl, repostContent, reposterName]
    )
    :   
    db.query(
        `INSERT INTO reposts (id, "posterId", url, "reposterName") VALUES ($1, $2, $3, $4)`, [postId, posterId, repostUrl, reposterName]
    )
}
export function postExists(postId) {
    return db.query(
        `SELECT * FROM posts WHERE id=$1`, [postId]
        )
}
export function getReposts() {
    return db.query(
        `SELECT * FROM reposts`
        )
}