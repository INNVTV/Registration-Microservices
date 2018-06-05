/*jshint esversion:6 */

const Joi = require('joi');
const registrationModel = require('./models/registration');

function validateRegistration(){
    console.log('validated!');
}

module.exports.validateRegistration = validateRegistration;