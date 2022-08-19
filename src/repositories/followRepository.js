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
        `SELECT "followedUserId" AS id,
        users.name AS name
        FROM follows
        JOIN users
        ON follows."followedUserId" = users.id
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
export async function getAllFollowedWithReposts(userId) {
    return db.query(
        `SELECT posts.id AS "postId",
        users.id AS "userId",
        users.name, posts.id,
        posts.content, users."profilePicture",
        posts."createdAt",
        posts.url, posts."isRepost",
		CASE
			WHEN posts."isRepost" IS FALSE THEN NULL
		END AS "reposterName"
        FROM users 
        JOIN posts
        ON users.id=posts."posterId"
        JOIN follows
        ON users.id=follows."followedUserId"
        WHERE "followerUserId"= $1
		UNION SELECT reposts.id AS "postId",
        users.id AS "userId",
        users.name, reposts.id,
        reposts.content, users."profilePicture",
        reposts."createdAt",
        reposts.url,
		reposts."isRepost",
		reposts."reposterName"
        FROM users 
        JOIN reposts
        ON users.id=reposts."posterId" OR users.name = reposts."reposterName"
        JOIN follows
        ON users.id=follows."followedUserId"
        WHERE "followerUserId"= $1 OR users.name = reposts."reposterName"
        ORDER BY "createdAt" 
        DESC LIMIT 20;`,[userId]
    )
}
