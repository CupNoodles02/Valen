const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors());

// In Server.cjs
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for testing
    methods: ["GET", "POST"]
  }
});


// Store active users
const activeUsers = new Map();
const chatHistory = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send chat history to new user
  socket.emit('chat_history', chatHistory);

  // Handle user join
  socket.on('user_join', (username) => {
    activeUsers.set(socket.id, username);
    
    // Broadcast to all users
    io.emit('user_joined', {
      username,
      userId: socket.id,
      timestamp: new Date().toISOString()
    });

    // Send active users list
    io.emit('active_users', Array.from(activeUsers.values()));
  });

  // Handle username change
  socket.on('username_change', (newUsername) => {
    const oldUsername = activeUsers.get(socket.id);
    activeUsers.set(socket.id, newUsername);
    
    io.emit('username_changed', {
      oldUsername,
      newUsername,
      userId: socket.id,
      timestamp: new Date().toISOString()
    });

    // Send updated active users list
    io.emit('active_users', Array.from(activeUsers.values()));
  });

  // Handle new message
  socket.on('send_message', (data) => {
    const username = activeUsers.get(socket.id) || 'Anonymous';
    const message = {
      id: Date.now() + Math.random(),
      username,
      userId: socket.id,
      message: data.message,
      timestamp: new Date().toISOString()
    };

    // Store in history (limit to last 100 messages)
    chatHistory.push(message);
    if (chatHistory.length > 100) {
      chatHistory.shift();
    }

    // Broadcast to all users
    io.emit('receive_message', message);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    const username = activeUsers.get(socket.id);
    if (username) {
      socket.broadcast.emit('user_typing', {
        username,
        userId: socket.id,
        isTyping
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const username = activeUsers.get(socket.id);
    if (username) {
      io.emit('user_left', {
        username,
        userId: socket.id,
        timestamp: new Date().toISOString()
      });
    }
    activeUsers.delete(socket.id);
    
    // Send updated active users list
    io.emit('active_users', Array.from(activeUsers.values()));
    
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Chat server running on port ${PORT}`);
});
