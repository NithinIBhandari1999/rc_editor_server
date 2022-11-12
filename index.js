const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const envKeys = require('./src/config/envKeys');

const connectDB = require('./src/config/db');

let PORT = 8080;
if( envKeys.CUSTOM_ENV === 'prod' ) {
    console.log({
        PORT: process.env.PORT
    });
    PORT = process.env.PORT;
}

const app = express();

const server = require('http').createServer(app);

const socketInit = require('./src/config/socket');

const io = socketInit(server);

const routes = require('./src/routes/index');

connectDB();

app.use(cookieParser());

app.use(bodyParser.json());

app.use(function (req, res, next) {

    let origin = req.get('origin');

    console.log({
        req,
        origin,
    });
    
    if(!origin) {
        origin = envKeys.BACKEND_URL;
    }

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', async (req, res) => {
    try {
        const token = '12345';

        res.cookie('jwtValue', token, { maxAge: 9000000000, httpOnly: true, secure: true });

        let socket = await io.on('connection', (socket) => {
            console.log(socket);
            
            const payload = { message: 'Test', user: { id: 'foOO' } };
            io.emit('chat', payload);
        });
        console.log({
            socket
        });

        return res.send('Learn Socket io');

    } catch (error) {
        console.log(error);
        return res.send('Learn Error Socket io');
    }
});

app.use('/api', routes);

server.listen(PORT, () => {
    console.log(`Listen on port http://localhost:${PORT}`);
});