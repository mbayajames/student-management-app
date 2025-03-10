const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT  || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(error));


 //Routes
//  app.use('/api/auth', require('./routes/auth'));
 app.use('/api/students', require('routes/students'));

 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
