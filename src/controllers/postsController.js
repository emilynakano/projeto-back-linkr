import { getPostsByPosterId } from "../repositories/postsRepository.js";
import { insertPost, getAllPosts, findPostById, updateContent} from '../repositories/postsRepository.js';
import urlMetadata from 'url-metadata';
import { getUserById } from "../repositories/userRepository.js";

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
                    id:post.userId,
                    name: post.name,
                    profilePicture: post.profilePicture, 
                    content: post.content, 
                    post: {
                        id:post.postId,
                        title: metadata.title,
                        description: metadata.description,
                        image: metadata.image,
                        url: post.url
                    }  
                })
            } catch {
                resp.push({
                    id:post.userId,
                    name: post.name,
                    profilePicture: post.profilePicture, 
                    content: post.content, 
                    post: {
                        id:post.postId,
                        title: null,
                        description: null,
                        image: null,
                        url: post.url
                    }  
                })
            }
        }
        res.status(200).send(resp)
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
        const { rows: user } = await getUserById(id);

        if (user.length === 0){
            res.status(404).send("User not found!");
            return;
        }

        for (const post of posts) {
            const metadata = await urlMetadata(post.url);
            post.title = metadata.title;
            post.description = metadata.description;
            post.image = metadata.image;
        }

        const response = {
            name: user[0].name,
            photo: user[0].profilePicture,
            posts
        }
        res.status(200).send(response);
        return;

    } catch (error) {
        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: "Internal server error while getting posts!",
        });
        return;
    }
}
        
export async function editPost(req,res){
    const {id} = req.params;
    const {content} = req.body;

    try {
        const post= await findPostById(id);
        if(post.rowCount===0){
            res.status(404).send('Post not found!');
            return;
        }
        await updateContent(id,content);
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
