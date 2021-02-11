import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
dotenv.config({
  path: `.env`,
});
import bodyParser from 'body-parser';
import { router } from './routes';
const app = express();
const { PORT } = process.env;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(cors());
app.options('*', cors());

app.listen(PORT, () => {
  console.log(`listening to requests on port ${PORT}`);
});
