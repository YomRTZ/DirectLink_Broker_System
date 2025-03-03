const { createTransporter } = require('../models/email');

const sendEmail = (req, res) => {
    const { from, to, secondRecipient, subject, message } = req.body;

    const transporter = createTransporter();

    const mailOptions = {
        from,
        to: `${to}, ${secondRecipient}`,
        subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Error sending email", error });
        } else {
            console.log("Email sent: " + info.response);
            return res.status(200).json({ message: "Email sent successfully", info });
        }
    });
};

module.exports = {
    sendEmail
};
