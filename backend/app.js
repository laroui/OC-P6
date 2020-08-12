const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./models/User');
const Thing = require('./models/thing');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');





mongoose.connect('mongodb+srv://sopecko:peckoco@cluster0.ygd8u.mongodb.net/sopecko?retryWrites=true&w=majority',
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
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth',userRoutes)

module.exports = app;
