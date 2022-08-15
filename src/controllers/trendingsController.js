import chalk from "chalk";
import { createTrendingTable, getAllContent } from "../repositories/postsRepository.js";
import { deleteTrendingContent, getTrendingList } from "../repositories/trengingsRepository.js";

export async function getTrendings(req, res) {

    function hashtag(str){
        if(!str) {
            return [];
        }
        const hashtags = str.match(/#\w+/g);
        if(hashtags){
            return hashtags.map(hashtag => hashtag.slice(1));
        }
            return [];
    }

    try {

        await deleteTrendingContent();

        let returnLength = [];
        const { rows: allPosts } = await getAllContent();
        
        for ( let post of allPosts ) {
            let hashs = hashtag(post.content);
            for (let hash of hashs) {
                await createTrendingTable(post.id, hash);
                returnLength.push('x');    
            }
        }
        
        const { rows: trendingList } = await getTrendingList()

        return res.status(200).send(trendingList);

    } catch (error) {

        console.log(chalk.bold.red("Erro no servidor!"));
        res.status(500).send({
          message: error,
        });
        return;
    }

}