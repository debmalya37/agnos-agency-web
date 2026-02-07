import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendLeadEmail = async (data: any) => {
  try {
    const info = await transporter.sendMail({
      from: `"Unio Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // This is where you receive the lead
      subject: `New Lead: ${data.name} - ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <h2 style="color: #F97316;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #F97316;">
            ${data.message}
          </div>
        </div>
      `,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("SMTP Error:", error);
    return { success: false, error };
  }
};