const http = require('http');
const socketIo = require('socket.io');
const app = require('./app'); // Import the Express app
const axios = require('axios');

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up Socket.io with the server
const io = socketIo(server);

// Replace with your actual Gemini API key
const GEMINI_API_KEY = 'your_actual_gemini_api_key'; // Make sure to use the correct key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for user messages
  socket.on('user_message', async (msg) => {
    console.log('User message:', msg);

    try {
      // Make a request to Gemini API with the user input
      const response = await axios.post(GEMINI_API_URL, {
        contents: [
          {
            parts: [{ text: msg }],
          },
        ],
      });

      // Get the generated content from the API response
      const chatbotReply = response.data.contents[0].parts[0].text;

      // Send the reply to the frontend
      socket.emit('chatbot_reply', chatbotReply);
    } catch (error) {
      console.error('Error from Gemini API:', error);
      socket.emit('chatbot_reply', 'Sorry, I could not process your request.');
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Use process.env.PORT or default to 5000
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
