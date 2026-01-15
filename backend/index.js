const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/todos', require('./src/routes/todoRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));

const { errorHandler } = require('./src/middlewares/errorMiddleware');
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
