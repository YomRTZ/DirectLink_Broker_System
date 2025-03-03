const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "", 
            pass: ""   
        }
    });
};

module.exports = {
    createTransporter
};
