import express, {json, urlencoded} from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import startServer from './server';


let app = express();

app.use(cors());
app.use(logger("dev"));
app.use(urlencoded({ extended: false }));
app.use(json({ limit: "200mb" }));
app.use(cookieParser());

app.use(function(err: any, _req: any, res: any, _next: any) {
    const error = {
        message: err.message,
        error: err.error,
        status: err.status || 500,
    };

    console.log(err);

    res.status(err.status || 500);
    res.json(error);
});

startServer(app);

export default app;



