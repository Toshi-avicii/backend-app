const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(str, data) {

    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        console.log(data);


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: "tushar.toshi12@gmail.com", // generated ethereal user
            pass: "wghxmhedgssazpfg", // generated ethereal password
            },
        });

        var Osubject,  Ohtml;
        if(str === "signup") {
            Osubject = `Thank you for signing ${data.name}`;
            Ohtml = `
                <h1>Welcome to Backend Application</h1>
                <p>Hope you have a good time !</p>
                <p>Here are your details:</p>
                <p><b>Name - ${data.name}</b></p>
                <p><b>Name - ${data.email}</b></p>
            `
        } else if(str ==="resetpassword") {
            Osubject=`Reset Password`;
            Ohtml = `
                <h1>Backend Application</h1>
                Here is your link to reset password:
                ${data.resetPasswordLink}
            `
        }

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Backend-app" <tushar.toshi12@gmail.com>', // sender address
            to: "tushar.toshi12@gmail.com", // list of receivers
            subject: Osubject, // Subject line
            // plain text body
            html: Ohtml, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = sendMail;