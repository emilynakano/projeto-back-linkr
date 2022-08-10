import { insertPost, getAllPosts } from '../repositories/postsRepository.js';
import urlMetadata from 'url-metadata';

export async function createPost(req, res) {
    const {url, content} = req.body;
    const posterId = res.locals.user.id;

    await insertPost(url, content, posterId);

    res.sendStatus(201)
};
export async function getPosts(req, res) {
    try {
        const {rows: posts} = await getAllPosts();
        const resp = []
        posts.map(async function (post){
            try {
                const metadata = await urlMetadata(post.url)
                resp.push({
                    name: post.name,
                    profilePicture: post.profilePicture, 
                    content: post.content, 
                    post: {
                        title: metadata.title,
                        description: metadata.description,
                        image: metadata.image
                    }  
                })
                if(resp.length === posts.length) {
                    return res.status(200).send(resp);
                }
            } catch(error) {
                if(resp.length === posts.length) {
                    return res.status(200).send(resp);
                }
                resp.push({
                    name: post.name,
                    profilePicture: post.profilePicture, 
                    content: post.content, 
                    post: {
                        title: null,
                        description: null,
                        image: null
                    }  
                })
            }
        })
    } catch {
        res.sendStatus(500)
    }
}