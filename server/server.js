// server/server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/category');
const productsRouter = require("./routes/products");
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api/subcategories', require('./routes/subCategoryRoutes'));
app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));