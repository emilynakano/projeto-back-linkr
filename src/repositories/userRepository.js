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

export async function getSearchUserByName (username,id){
    return db.query(
        `SELECT users.name,
        users.id,
        users."profilePicture",
        (case when exists
		(SELECT * FROM follows 
		WHERE "followerUserId"=$1
        	AND "followedUserId"=users.id)
        	then CAST (1 AS int)
        	else CAST (0 AS int)
        end) AS "isFollowing"
        FROM users
        WHERE users.name 
        ILIKE $2
        ORDER BY "isFollowing" DESC, users.name
        LIMIT 10`,[id,username + '%']
    );
}

export async function getFollow(followerUserId){
    return db.query(
        `SELECT "followedUserId","followerUserId" 
        FROM "follows"
        WHERE "followerUserId" = $1 `,[followerUserId]
    );
}