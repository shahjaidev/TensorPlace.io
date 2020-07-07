const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserInput(data) {
    let errors = {};

    // Converts all empty fileds to empty string
    // data.name = !isEmpty(data.name) ? data.name : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.githubId = !isEmpty(data.githubId) ? data.githubId : '';

    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Fisrt name field is requierd";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is requierd";
    }


    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    // Password checks
    if (Validator.isEmpty(data.githubId)) {
        errors.githubId = "githubId Id is required";
    }

    // if(Validator.isEmpty(data.termsAccepted)) {
    //     errors.termsAccepted = "Terms must accepted";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}