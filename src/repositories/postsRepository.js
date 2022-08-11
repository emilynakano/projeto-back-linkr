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
export async function getAllPosts() {
    return db.query(`SELECT users.name, posts.content, users."profilePicture", posts.url FROM users JOIN posts ON users.id=posts."posterId" ORDER BY posts."createdAt" DESC LIMIT 20;
    `)
}

export async function getPostsByPosterId(posterId) {
    return db.query(
        `SELECT *, users.name, users."profilePicture" FROM posts JOIN users ON "posterId" = users.id WHERE "posterId" = $1`, [posterId]);
    }

export async function findPostById(id){
    return db.query(
        `SELECT * FROM posts
        WHERE id = $1`,[id]
    );
}

export async function updateContent(id,content){
    return db.query(
        `UPDATE posts
        SET content = $1
        WHERE id = $2`,[content,id]
    );
}