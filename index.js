const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require("./src/api/user/routes")
const ticketRoute = require("./src/api/ticket/routes")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

// Serve the Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user', userRoute);
app.use('/ticket', ticketRoute);

//routing path
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
 }).then(() => console.log("Connection to mongodb success"))
 .catch(() => console.log("Error occured while connection to mongodb"));


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
  