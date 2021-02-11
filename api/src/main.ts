import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

const allowCrossDomain = function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);

app.listen(PORT, () => {
  console.log(`listening to requests on port ${PORT}`);
});
