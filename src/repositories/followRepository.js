import db from "../config/db.js";

export async function getFollow(followerUserId,followedUserId){
    return db.query(
        `SELECT * FROM follows
        WHERE "followerUserId" = $1
        AND "followedUserId" = $2`,[followerUserId,followedUserId]
    );
}

export async function insertFollow(followerUserId,followedUserId){
    return db.query(
        `INSERT INTO follows ("followerUserId","followedUserId")
        VALUES ($1, $2)`,[followerUserId,followedUserId]
    );
}
export async function unfollow(followerUserId,followedUserId){
    return db.query(
        `DELETE FROM follows
        WHERE "followerUserId" = $1
        AND "followedUserId" = $2`,[followerUserId,followedUserId]
    );
}
export async function getFollowUser(userId){
    return db.query(
        `SELECT "followedUserId" AS id FROM follows
        WHERE "followerUserId"=$1`, [userId]
    );
}


export async function getAllFollowed(userId){
    return db.query(
        `SELECT posts.id AS "postId",
        users.id AS "userId",
        users.name, posts.id,
        posts.content, users."profilePicture",
        posts."createdAt",
        posts.url 
        FROM users 
        JOIN posts
        ON users.id=posts."posterId"
        JOIN follows
        ON users.id="followedUserId"
        WHERE "followerUserId"= $1
        ORDER BY posts."createdAt" 
        DESC LIMIT 20;`,[userId]
    );
}
export async function getReposts(userId){
    return db.query(
        `SELECT 
        users.name,
        reposts."postId" 
        FROM reposts 
        JOIN users 
        ON users.id=reposts."userId"
        JOIN follows
        ON users.id="followedUserId"
        WHERE "followerUserId"= $1
        ;`,[userId]
    );
}