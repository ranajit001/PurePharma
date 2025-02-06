const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const  cors = require('cors');

const http = require("http"); 
const { Server } = require("socket.io");
const { getMedicineResponse } = require('./chatAi');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);
  
    socket.on("userMessage", async (message) => {
      let response;
      if(message === "hi" || message === "hii" ||message === "hello" || message === "hey"|| message == 'how are you') response = "Hello! i am health Bot. How are you feeling ?"
       else response = await getMedicineResponse(message);
      // console.log(response)
      socket.emit("botResponse", response); // Send reply
    });
  
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
  });


dotenv.config();
connectDB();


app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/medicines', medicineRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.get("/test", (req, res) => {
    res.send("Hello World");
})
 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
