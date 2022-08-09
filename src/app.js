import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(json());

dotenv.config();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log("server running")
});