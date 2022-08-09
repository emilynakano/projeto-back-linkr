import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTest } from './controllers/controllers.js';
import router from './routes/router.js';
import chalk from "chalk";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 5000;

app.get('/test', getTest)

app.listen(PORT,()=>{
    console.log(chalk.bold.green(`Servidor conectado na porta ${PORT}.`));
});