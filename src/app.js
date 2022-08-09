import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getTest } from './controllers.js';

const app = express();
app.use(cors());
app.use(json());

dotenv.config();
const PORT = process.env.PORT;

app.get('/test', getTest)

app.listen(PORT, () => {
    console.log(`server running na porta ${PORT}`);
});