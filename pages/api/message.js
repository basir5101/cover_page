import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Create a transporter using your SMTP credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                //user: 'basir.bsmrstu@gmail.com',
                //pass: 'ofllefedyzwyleio'
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        try {
            // Send the email
            const info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: process.env.EMAIL, // Replace with the recipient's email address
                subject: 'New message from cover page',
                text: `
                        Name: ${name}
                        Email: ${email}
                        Message: ${message}
                    `,
            });

            console.log('Message sent: %s', info.messageId);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error occurred while sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
}