import express, {Express} from 'express';

// eslint-disable-next-line
import bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger_middleware';
import errorHandler from './middleware/error_middleware';

const app: Express = express();

app.use(loggerMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(errorHandler);

export default app;
