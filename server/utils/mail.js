const nodemailer = require('nodemailer')
const config = require('./config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${config.EMAIL_ADDRESS}`,
    pass: `${config.EMAIL_PASSWORD}`,
  },
})

const sendMail = (name, email, subject, text) => {
  const mailOptions = {
    sender: name,
    from: config.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('there was an error: ', err)
    } else {
      response.status(200).send('recovery email sent')
    }
  })
}

module.exports = { transporter, sendMail }