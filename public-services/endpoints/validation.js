/*jshint esversion:6 */

function validateRegistration(req){

    let response = { isValid : true, errors: []};
    
    if(!req.body.name){
        response.isValid = false;
        response.errors.push('A name is required');
    }
    if(!req.body.name){
        response.isValid = false;
        response.errors.push('A name is required');
    }
    if(req.body.name.length < 2){
        response.isValid = false;
        response.errors.push('Name must be at least 2 characters in length');
    }
    if(req.body.name.length > 25){
        response.isValid = false;
        response.errors.push('Name cannot be over 25 characters in length');
    }
    if(!req.body.email){
        response.isValid = false;
        response.errors.push('An email is required');
    }
    if(!validateEmail(req.body.email))
    {
        response.isValid = false;
        response.errors.push('Please use a valid email address');
    }

    return response;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.validateRegistration = validateRegistration;