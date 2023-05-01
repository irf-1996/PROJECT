const otpLength = 6;
const digits = '0123456789';

function generateOTP()
{
    let otp = '';
    for(let i=1; i<=otpLength; i++)
    {
        let index = Math.floor(Math.random()*(digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

module.exports = generateOTP
