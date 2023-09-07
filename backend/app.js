import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
import { port } from './config/config.js';
import usersRoute from './routes/users.js';
import postRouter from './routes/post.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { rateLimit } from "express-rate-limit"
import { CustomError } from './util/customError.js';
const app = express();
const PORT = port || 8000

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes"

})

app.use(apiRateLimit)

const whitelist = ['http://localhost:3000', 'http://localhost:5173'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };  // Reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false };  // Disable CORS for this request
    }
    callback(null, corsOptions);  // Callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate))

connectDB();



app.use('/api/v1/users', usersRoute);
app.use('/api/v1/users', postRouter);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })

} else {
    app.get('/api', (req, res) => {
        res.send('API is running....')
    })
}

// 404
app.use((req, res, next) => {

    next(CustomError(404, `${req.originalUrl}  Not Found`))


})

app.use((error, req, res, next) => {

    const status = error.status || 500
    const message = error.message || 'Internal Server Error'

    res.status(status).json(message)

})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})