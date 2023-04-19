const sgMail = require("@sendgrid/mail");

async function verifyEmail(email) {
  try {
    sgMail.setApiKey(
      "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"
    );
    const msg = {
      to: email,
      from: "verification@example.com",
      subject: "Email Verification",
      text:
        "Please click the link to verify your email: http://example.com/verify?email=" +
        email,
      html:
        'Please click the link to verify your email: <a href="http://example.com/verify?email=' +
        email +
        '">http://example.com/verify?email=' +
        email +
        "</a>",
    };
    await sgMail.send(msg);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(error);
  }
}
verifyEmail("arorashivam@protonmail.com");
