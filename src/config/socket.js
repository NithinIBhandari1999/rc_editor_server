const { Server } = require('socket.io');

const constantSocketActions = require('../constant/constantSocket/constantSocketActions');

const userList = {};

const init = (server) => {
    try {
        const io = new Server(server, {
            cors: {
                origin: [
                    'http://localhost:3000',
                    'localhost:3000'
                ],
                allowedHeaders: ['Set-Cookie'],
                credentials: true
            }
        });

        io.on('connection', (socket) => {
            const socketId = socket.id;

            userList[String(socketId)] = socketId;

            // const session = socket.request;
            // // console.log(session);
            // var headers = socket.handshake.headers;
            // // console.log(socket.request.headers);
            // // console.log({ headers });
            // // console.log("What is socket: ", socket);
            // console.log('Socket is active to be connected');
            // // console.log('cookies: ', socket.request);

            // socket.on('chat', (payload) => {
            //     console.log('What is payload: ', payload);
            //     io.emit('chat', payload);
            // });

            socket.on(constantSocketActions.CODE_CHANGE, (payload) => {

                const connectedUsers = [];
                Object.keys(userList).forEach(userId => {
                    if (userId !== socketId) {
                        connectedUsers.push(userId);
                    }
                });

                io.to(connectedUsers).emit(constantSocketActions.CODE_CHANGE, payload);
            });

            socket.on('disconnected', () => {
                delete userList[socketId];
            });

        });

        return io;
    } catch (error) {
        console.error(error);
    }
};

module.exports = init;