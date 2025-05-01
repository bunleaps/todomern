import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

// Load env
dotenv.config();

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "todomern",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// GET "/" route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the TODO API" });
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Use admin routes
app.use('/api/admin', adminRoutes);

// Use todo routes
app.use('/api/todos', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});