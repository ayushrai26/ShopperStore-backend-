const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to Database"))
.catch(err => console.error("❌ Database Connection Error:", err));

// Routes
const itemRoutes = require('./routes/auth');
app.use('/api', itemRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server started at port ${PORT}`);
});
