// Example using Express.js
const express = require('express');
const app = express();

// Example defining a route in Express
app.get('/', (req, res) => {
    res.send('hello root node');
});

//include route files
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

//Use routes
app.use('/users', usersRoute);
app.use('/products', productsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

