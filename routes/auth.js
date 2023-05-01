const express = require('express')
const Login = require('../models/login')
const router = express.Router()
const emailRegex = /^[^\s@]+@([^\s@]+\.)*roehampton\.[^\s@]+$/;
const { sendMail } = require('../helpers/mail')
const generateOtp = require('../helpers/generateOTP')
const { signAccessToken } = require('../middlewares/jwt_helper')

router.post('/sendOtp', async (req, res) => {
    try {
        let email = req.body.email
        let isEmail = emailRegex.test(email)
        if (!isEmail) throw ('Invalid Email.Try login with college ID') //!error handle

        let otp = generateOtp();
        console.log(otp)
        await sendMail(email, otp)   //send email
        let emailFound = await Login.findOne({ email })

        if (emailFound) {
            await Login.findByIdAndUpdate(emailFound._id, { otp }, { new: true })
        }
        else {
            const login = new Login({ email, otp })
            await login.save()
        }

        res.status(200).json({ message: 'Email send successfully', otp: otp, status: true })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error, status: false })
    }
})

router.post('/loginWithOtp', async (req, res) => {
    try {
        let { email, otp } = req.body
        console.log(req.body)
        let isEmail = emailRegex.test(email)
        if (!isEmail) throw ('Invalid Email') //!error handle

        let data = await Login.findOne({ email })
        if (!data) throw ('Email not found in db') //!error handle
        if (otp !== data.otp) throw ('Invalid OTP') //!error handle
        //login successfull
        const user = { email: email, admin: data.admin, login: true }

        const accessToken = await signAccessToken(user)
        console.log(accessToken)
        res.status(201).send({ token: accessToken, message: 'Login Successfull', status: true });
        //setting token

    }
    catch (error) {
        res.status(400).json({ error: error, status: false })
    }
})

module.exports = router;