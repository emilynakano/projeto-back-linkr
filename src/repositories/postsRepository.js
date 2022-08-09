import db from "../config/db.js";
export async function insertPost(url, content, posterId) {
    return content ? 
    db.query(
        `INSERT INTO posts ("posterId", url, content) VALUES ($1, $2, $3)`, [posterId, url, content]
    )
    :   
    db.query(
        `INSERT INTO posts ("posterId", url) VALUES ($1, $2)`, [posterId, url]
    )
}