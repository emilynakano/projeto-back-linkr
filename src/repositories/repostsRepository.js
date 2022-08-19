import db from "../config/db.js";

export async function postRepost (postId, userId) {
    return db.query(
        `INSERT INTO reposts ("postId", "userId") VALUES ($1, $2)`, [postId, userId]
    )
}
export function postExists(postId) {
    return db.query(
        `SELECT * FROM posts WHERE id=$1`, [postId]
        )
}