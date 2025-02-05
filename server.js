const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const  cors = require('cors');



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/medicines', medicineRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.get("/", (req, res) => {
    res.send("Hello World");
})
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app;