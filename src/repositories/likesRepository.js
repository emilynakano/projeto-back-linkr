import db from "../config/db.js"
export async function insertLike (userId, postId){
    return db.query(
        `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`, [userId, postId]
        )
}
export async function getUserLike (userId) {
    return db.query (
        `SELECT "postId" AS id FROM likes WHERE "userId"=$1`, [userId]
    )
}
export async function getPosts () {
    return db.query (
        `SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20`
    )
}
export async function getLikes(post) {
    return db.query(`SELECT users.name FROM likes JOIN users ON users."id"=likes."userId" WHERE "postId"=$1`, [post.id]
    );
}