/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    name: String,
    email: String,
    createdAt: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model("Registtration", RegistrationSchema)