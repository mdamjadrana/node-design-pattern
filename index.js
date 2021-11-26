import express from 'express'
import dbConnection from './mongo'
import configureController from './controllers'

const app = express();
const port = 3000;

app.use(express.json());

dbConnection();

configureController(app);

app.listen(port, () => {
    console.log('server runing http://localhost:', port);
})