const express = require('express');
const cors = require('cors');
const http = require('http');
const { connectToDb } = require('./config/dbConnection.js');
const { initSocket } = require('./socket.js');
const codeBlockRoutes = require("./routes/codeBlockRoutes");
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

// Connect to MongoDB
connectToDb();

app.use("/api/codeblock", codeBlockRoutes);

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});