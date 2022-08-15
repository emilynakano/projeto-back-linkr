import db from "../config/db.js";

export async function getTrendingList() {
    return db.query(`SELECT hashtag, COUNT("postId") as amount 
        FROM hashtags
        GROUP BY hashtag
        ORDER BY amount DESC;`
        )
}

export async function deleteTrendingContent() {
    return db.query('DELETE FROM hashtags')
}