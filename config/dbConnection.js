const mongoose = require('mongoose');

const connectToDb = async () => {
    mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
}


module.exports = { connectToDb };

