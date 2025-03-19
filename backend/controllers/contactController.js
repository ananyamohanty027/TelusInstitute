const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create transporter for sending emails
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;

        // Create contact in database
        const contact = await Contact.create({
            name,
            phone,
            email,
            subject,
            message
        });

        // Send email notification if configured
        if (transporter) {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER, // Send to the same email
                    subject: `New Contact Form Submission - ${subject || 'No Subject'}`,
                    html: `
                        <h3>New Contact Form Submission</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                        <p><strong>Message:</strong> ${message}</p>
                    `
                };

                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Continue execution even if email fails
            }
        }

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Contact form submitted successfully'
        });

    } catch (error) {
        console.error('Error in submitContact:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error in getContacts:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}; 