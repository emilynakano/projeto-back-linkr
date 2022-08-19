import db from "../config/db.js"

export async function getUserByUsername(username){
    return db.query(
        `SELECT * FROM users WHERE name = $1`,
        [username]
    );
}

export async function getUserById(id){
    return db.query(
        `SELECT name, "profilePicture" FROM users WHERE id = $1`,
        [id]
    );
}

export async function getUsersBySearch(username,id){
    return db.query(
        `SELECT id, name, "profilePicture" FROM users WHERE name ILIKE $1 LIMIT 10`,
        [username + '%']
    );
}

export async function getSearchUserByName (name){
    return db.query(
        `SELECT users.name,
        users.id,
        users."profilePicture"
        FROM users
        WHERE users.name 
        ILIKE $1
        ORDER BY users.name;`,[name]
    );
}

export async function getFollow(followedUserId,followerUserId){
    return db.query(
        `SELECT * FROM "follows"
        WHERE "followedUserId" = $1 
        AND "followerUserId" = $2;`,[followedUserId,followerUserId]
    );
}