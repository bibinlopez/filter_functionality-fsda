require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');

//connect to the database
const connectDB = require('./db/connect');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');

//middlewares
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

app.use(morgan('tiny'));
app.use(express.json());

// app.use(express.static('./public'));

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/item', itemRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to the DB..');
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
