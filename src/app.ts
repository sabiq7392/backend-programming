import express, { Application } from 'express';
import router from './routes/api';

require('dotenv').config();

const { BASE_URL, APP_PORT } = process.env;

const app: Application = express();

app.listen(APP_PORT || 3000, () => console.log(`Server running in ${BASE_URL}:${APP_PORT}`));

app.use(express.json());
app.use(router);
