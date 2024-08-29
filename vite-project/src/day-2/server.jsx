const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const presentationRoutes = require('./routes/presentationRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/presentations', presentationRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io setup
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('slideUpdate', (data) => {
        socket.broadcast.emit('slideUpdated', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
