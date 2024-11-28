const express = require('express')
const cors = require('cors')
const connectDB = require("./config/database.js")
const forexRoutes = require("./routes/forexRoutes.js")
const ScraperCron = require("./cron/scraperCron.js")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize Cron Jobs
ScraperCron.init();

// Routes
app.use('/api', forexRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
