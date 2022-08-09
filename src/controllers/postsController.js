import db from '../config/db.js'
import { insertPost } from '../repositories/postsRepository.js';
export async function createPost(req, res) {
    const {url, content} = req.body;
    const posterId = res.locals.user.id;

    await insertPost(url, content, posterId);

    res.sendStatus(201)
}