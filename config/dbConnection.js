const mongoose = require('mongoose');

const connectToDb = async () => {
    mongoose.connect(mongodb+srv://shaharshwartz: TelAviv1997@cluster0.n5lp6lf.mongodb.net/coding_app?retryWrites=true&w=majority&appName=Cluster0 , { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
}


module.exports = { connectToDb };


//process.env.CONNECTION_STRING
