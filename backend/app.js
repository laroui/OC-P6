const express = require ('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./models/user.js');
const sauce = require('./models/sauce');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');





mongoose.connect('mongodb+srv://dzaltern:passfor@cluster0-kqhbz.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth',userRoutes)

module.exports = app;
