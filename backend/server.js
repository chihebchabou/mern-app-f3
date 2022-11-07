const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
