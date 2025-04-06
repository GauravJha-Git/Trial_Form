import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify the connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('❌ Email service error:', error);
    } else {
        console.log('✅ Email service is ready to send messages');
    }
});

export const sendFormSubmissionEmail = async (formData) => {
    const mailOptions = {
        from: `"Form Submission" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: 'New Form Submission',
        html: `
            <h2>New Form Submission Received</h2>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.number || 'Not provided'}</p>
            <p><strong>WhatsApp:</strong> ${formData.watsNumber || 'Not provided'}</p>
            <p><strong>Service:</strong> ${formData.service}</p>
            <p><strong>Comments:</strong> ${formData.comments || 'Not provided'}</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully');
        console.log('Message ID:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
}; 