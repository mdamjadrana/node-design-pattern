import express from 'express'
import {dbConnection, uri} from './mongo'
import configureController from './controllers'
import { handelErrors } from './middlewars/handleErrors';
import winston from 'winston';
import expressWinston from 'express-winston'
import winstonFile from 'winston-daily-rotate-file'
import {ElasticsearchTransport} from 'winston-elasticsearch'
import winstonMongo from 'winston-mongodb'

const app = express();
const port = 3000;

app.use(express.json());

const processRequest = async (req, res, next) => {
    let correlationId =  req.headers['x-correlation-id'];
    if(!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }
    res.set('x-correlation-id', correlationId);

    return next();
}

app.use(processRequest);

const fileInfoTransports = new(winston.transports.DailyRotateFile)(
    {
        filename: 'logs/info/log-info-%DATE%-log',
        datePattern: 'yyyy-MM-DD-HH'
    }
)
const fileErrorTransports = new(winston.transports.DailyRotateFile)(
    {
        filename: 'logs/errors/log-error-%DATE%-log',
        datePattern: 'yyyy-MM-DD-HH'
    }
)

const mongoErrorTransports = new (winston.transports.MongoDB)(
    {
        db: uri,
        metaKey: 'meta'
    }
)

const getMessage = (req, res) => {
    let data = {
        correlationId: req.headers['x-correlation-id'],
        body: req.body
    }
    return JSON.stringify(data);
}

const winstonInfo = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        fileInfoTransports
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: getMessage
});

const winstonError = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        fileErrorTransports,
        mongoErrorTransports
    ]
})
app.use(winstonInfo);

dbConnection();

configureController(app);

app.use(winstonError);

app.use(handelErrors)

app.listen(port, () => {
    console.log('server runing http://localhost:', port);
})