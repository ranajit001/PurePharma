const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { getMedicineResponse } = require('./chatAi');

const app = express();

dotenv.config();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/medicines', medicineRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.get('/test', (req, res) => {
  res.send('Hello World');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Initialize conversation history for each user when they connect
  socket.conversationHistory = [];

  socket.on('userMessage', async (message) => {
    try {
      // Append the user's message to the history
      socket.conversationHistory.push(`User: ${message}`);

      // Limit the history to the last 15 messages to prevent too much data
      if (socket.conversationHistory.length > 15) {
        socket.conversationHistory.shift(); // Remove the oldest message
      }

      // Generate a response from the AI based on the current conversation history
      const response = await getMedicineResponse(socket.conversationHistory, message);

      // Append the AI's response to the conversation history
      socket.conversationHistory.push(`AI: ${response}`);

      // Send the response back to the specific user
      socket.emit('botResponse', response); // Make sure you use socket.emit
    } catch (error) {
      console.error('Chatbot error:', error);
      socket.emit('botResponse', 'Sorry, something went wrong.');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));