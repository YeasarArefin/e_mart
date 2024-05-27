import nodemailer from 'nodemailer';

export default async function sendEmail(from: string, to: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        const result = await transporter.verify();
        console.log("🚀 ~ sendEmail ~ result:", result);
    } catch (error) {
        console.log("🚀 ~ sendEmail ~ result:", error);
        return;
    }

    try {
        const emailResponse = await transporter.sendMail({
            from: `E-Mart <${from}>`,
            to,
            subject,
            text: html
        });
        console.log("🚀 ~ sendEmail ~ info:", emailResponse);
    } catch (error) {
        console.log("🚀 ~ sendEmail ~ error:", error);
    }
}