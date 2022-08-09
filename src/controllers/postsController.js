import { insertPost, getAllPosts } from '../repositories/postsRepository.js';
export async function createPost(req, res) {
    const {url, content} = req.body;
    const posterId = res.locals.user.id;

    await insertPost(url, content, posterId);

    res.sendStatus(201)
};
export async function getPosts(req, res) {
    const {rows: posts} = await getAllPosts();
    res.status(200).send(posts);
}