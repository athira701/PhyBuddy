

export const otpEmailTemplate = (
    otp: string
) => `
<h2>Verify Your Email</h2>

<p>Your verification code is:</p>

<h1>${otp}</h1>

<p>This code expires in 60 seconds.</p>
`;