import config from "../config/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  pool: true,
  rateDelta: 10000,
  rateLimit: 1,
  host: config.mail.host,
  secure: true,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

const sendVerification = async (token, to) => {
  try {
    await transporter.sendMail(
      {
        from: config.mail.user,
        to: to,
        subject: "name.cz - Aktivace uctu",
        text: `Aktivujte svuj ucet kliknutim na nasledujici odkaz: name.cz/validate/${token}`,
        html: `<div style="width: 600px">Aktivujte svuj ucet kliknutim na nasledujici odkaz: name.cz/validate/${token}</div>`,
      },
      (err, info, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`info: ${info}\n\nresponse: ${response}\n\n`);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export { sendVerification };
