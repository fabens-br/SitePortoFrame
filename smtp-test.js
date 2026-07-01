/* eslint-disable */
const nodemailer = require("nodemailer");

async function main() {
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS (stringified):", JSON.stringify(process.env.SMTP_PASS));
    console.log("SMTP_PASS length:", process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    try {
        await transporter.verify();
        console.log("SMTP OK");
    } catch (error) {
        console.error("====== ERRO ======");
        console.error("error.code:", error.code);
        console.error("error.command:", error.command);
        console.error("error.response:", error.response);
        console.error("error.stack:", error.stack);
    }
}

main();
