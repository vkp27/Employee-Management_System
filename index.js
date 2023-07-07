const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./Routes/employeeRouter')
const app = express();
const dotenv = require('dotenv');


//Config
dotenv.config();

//Middleware
app.use(express.json());

// Use the employee routes
app.use('/employees', employeeRouter);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

mongoose
  .connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
