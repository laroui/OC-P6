const mongoose = require('mongoose');
const sauceSchema =mongoose.Schema({
    userId:{type: String , required},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    name: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('sauce', sauceSchema);
