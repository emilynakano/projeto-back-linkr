import db from "../config/db.js";

export async function getUserEmail(email){
    return db.query(
        `SELECT * FROM users WHERE email = $1`,[email]
    );
}

export async function getUsername(username){
    return db.query(
        `SELECT * FROM users WHERE name = $1`,[username]
    );
}

export async function createUser(email, password, username, pictureUrl){
    return db.query(
        `INSERT INTO users (email, password, name, profilePicture)
        VALUES($1, $2, $3, $4)`,
        [email, password, username, pictureUrl]
    );
}