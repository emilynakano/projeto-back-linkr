import db from "../config/db.js"
export async function insertLike (userId, postId){
    return db.query(
        `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [userId, postId]
        )
}