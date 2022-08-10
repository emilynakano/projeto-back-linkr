import { getPostsByPosterId } from "../repositories/postsRepository.js";

export function createPost(req, res) {
    res.send("oi")
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
}