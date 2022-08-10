import db from "../config/db.js";
export async function insertPost(url, content, posterId) {
    return db.query(
        `INSERT INTO posts ("posterId", url, content) VALUES ($1, $2, $3)`, [posterId, url, content])
}

export async function getPostsByPosterId(posterId) {
    return db.query(
        `SELECT *, users.name, users."profilePicture" FROM posts JOIN users ON "posterId" = users.id WHERE "posterId" = $1`, [posterId])
}