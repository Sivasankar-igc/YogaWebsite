import Nodemailer from "nodemailer";
import fs from "fs"

const transporter = Nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL_ACCOUNT,
        pass: process.env.APP_PASSWORD
    }
})

export const sendMail = (mailId, image) => {
    const mailOptions = {
        from: {
            name: "PROHUB",
            address: process.env.SENDER_EMAIL_ACCOUNT
        },
        to: mailId,
        subject: "Payment Verification",
        html: `<h1>EmailId : ${mailId}</h1>`,
        attachments: [
            {
                fileName: "image",
                path: `./PaymentImages/${image.filename}`
            }
        ]
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(`Server Error : mail couldn't be sent--> ${error}`);
        } else {
            fs.unlink(`./PaymentImages/${image.filename}`, (err) => {
                if (err) console.error(`Error ${err}`)
            })
        }
    });

}