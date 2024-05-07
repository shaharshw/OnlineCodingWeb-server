const socketIO = require('socket.io');

let io;
const clients = new Map(); // Map to store socket ID and role
const tokens = new Map(); // Map to store token and role
let mentorId = null;

function initSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        let role;
        if (mentorId === null) {
            // If there's no mentor, assign the role of mentor to the first client
            mentorId = socket.id;
            role = 'mentor';
        } else if (socket.id === mentorId) {
            // If the client is the mentor, assign the role of mentor
            role = 'mentor';
        } else {
            // If there's already a mentor, assign the role of student to all other clients
            role = 'student';
        }

        clients.set(socket.id, role);
        socket.emit('roleAssigned', role);
        console.log(`Assigned role: ${role}`);
        console.log(`Emitted roleAssigned event with role: ${role}`);

        socket.on('codeChange', (newCode) => {
            io.emit('codeUpdate', newCode); 
        });

        socket.on('authenticate', (token) => {
            let role;
            if (!tokens.has(token)) {
                // If the token is not recognized, assign a role based on whether there's already a mentor
                if (Array.from(tokens.values()).includes('mentor')) {
                    role = 'student';
                } else {
                    role = 'mentor';
                }
                tokens.set(token, role);
            } else {
                // If the token is recognized, assign the previously assigned role
                role = tokens.get(token);
            }

            clients.set(socket.id, role);
            socket.emit('roleAssigned', role);
            console.log(`Assigned role: ${role}`);
            console.log(`Emitted roleAssigned event with role: ${role}`);
        });

        socket.on('submit', () => {
            socket.broadcast.emit('submit');
        });

        socket.on('success', () => {
            socket.broadcast.emit('success');
        });

        socket.on('disconnect', () => {
            clients.delete(socket.id);
            if (socket.id === mentorId) {
                // If the mentor disconnects, assign the role of mentor to the next client
                mentorId = Array.from(clients.keys())[0];
                if (mentorId) {
                    clients.set(mentorId, 'mentor');
                    io.to(mentorId).emit('roleAssigned', 'mentor');
                }
            }
        });
        console.log('Client disconnected');
    });
}

module.exports = { initSocket };