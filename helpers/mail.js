const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodetest4342',
    pass: 'tucandzsgzzgqxdd'
  },
});

async function sendMail(toEmail, otp) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Test College" <nodetest4342@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: `Otp`, // Subject line
    // text: "Hello world?", // plain text body
    html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h2>Otp for login.</h2>
            <h4></h4>
            <p style="margin-bottom: 30px;">Use this otp for login</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
            <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail.</p>
          </div>
        `,
  });
  return info
  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function sendTicketNumber(toEmail, tkt) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Test College" <nodetest4342@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: `Ticket Number : ${tkt}`, // Subject line
    // text: "Hello world?", // plain text body
    html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h2>Ticket Number</h2>
            <h4></h4>
            <p style="margin-bottom: 30px;">Thank you for contacting Us. Your ticket number is :</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${tkt}</h1>
          </div>
        `,
  });
  return info
  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = { sendMail, sendTicketNumber }