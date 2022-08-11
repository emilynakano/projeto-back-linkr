import { getPostsByPosterId } from "../repositories/postsRepository.js";
import { insertPost, getAllPosts, findPostById, updateDescription } from '../repositories/postsRepository.js';
import urlMetadata from 'url-metadata';

export async function createPost(req, res) {
    const {url, content} = req.body;
    const posterId = res.locals.user.id;
    console.log(posterId)
    await insertPost(url, content, posterId);

    res.sendStatus(201)
};
export async function getPosts(req, res) {
    try {
        const {rows: posts} = await getAllPosts();
        const resp = []
        for(const post of posts) {
            try {
                const metadata = await urlMetadata(post.url)
                resp.push({
                    name: post.name,
                    profilePicture: post.profilePicture, 
                    content: post.content, 
                    post: {
                        title: metadata.title,
                        description: metadata.description,
                        image: metadata.image,
                        url: post.url
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
                        image: null,
                        url: post.url
                    }  
                })
            }
        }
    } catch {
        res.sendStatus(500)
    }
}

export async function getUserPostsById(req, res) {

    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).send("Invalid id!");
        return;
    }

    try {
        
        const { rows: posts } = await getPostsByPosterId(id);
        res.status(200).send(posts);
        return;

    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while getting posts!",
        });
        return;
}
        
export async function editPost(req,res){
    const {id} = req.params;
    const {description} = req.body;

    try {
        const post= await findPostById(id);
        if(post.rowCount===0){
            res.status(404).send('Post not found!');
            return;
        }
        await updateDescription(id,description);
        res.sendStatus(204);
        return;
    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while edit post!",
        });
        return;
    }
}