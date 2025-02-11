const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const cors = require('cors');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "*", // Change this to your frontend URL (e.g., "http://localhost:3000")
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(bodyParser.json());
app.use(express.json());

const http = require("http");
const { Server } = require("socket.io");
const { getMedicineResponse } = require('./chatAi');

const server = http.createServer(app);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to match your frontend domain if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Initialize conversation history for each user
  socket.conversationHistory = [];

  socket.on("userMessage", async (message) => {
    try {
      // Append the user's message to the history
      socket.conversationHistory.push(`User: ${message}`);

      // Limit history to the last 15 messages
      if (socket.conversationHistory.length > 15) {
        socket.conversationHistory.shift();
      }

      // Get AI response
      const response = await getMedicineResponse(socket.conversationHistory, message);

      // Append AI's response to history
      socket.conversationHistory.push(`AI: ${response}`);

      // Send response back to the user
      socket.emit("botResponse", response);

    } catch (error) {
      console.error("Chatbot error:", error);
      socket.emit("botResponse", "Sorry, something went wrong.");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

dotenv.config();
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/medicines', medicineRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Test Route
app.get("/test", (req, res) => {
  res.send("Hello World");
});

// Start Server
const PORT = process.env.PORT || 5000;


//swagger
const swaggerUi = require('swagger-ui-express')
const fs = require('fs');
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));  //corrct the path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
