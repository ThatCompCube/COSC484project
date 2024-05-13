const nodemailer = require('nodemailer');

// Function to send email
function sendEmail(receiverEmail) {
    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'instructorinsight1@gmail.com',
            pass: 'bwto gjds swcf alf'
        }
    });

    // Email content
    let mailOptions = {
        from: 'instructorinsight1@gmail.com',
        to: receiverEmail,
        subject: 'Subject of the email',
        text: 'Body of the email'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = sendEmail;
