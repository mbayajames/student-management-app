const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const cors = require('cors');
const PORT = process.env.PORT  || 4000;



//Middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourDBName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));


 //Routes
//  app.use('/api/auth', require('./routes/auth'));
 app.use('/api/students', require('routes/students'));

 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
