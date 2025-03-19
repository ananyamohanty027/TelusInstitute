const Certificate = require('../models/Certificate');

// @desc    Generate certificate
// @route   POST /api/certificate
// @access  Public
exports.generateCertificate = async (req, res) => {
    try {
        const { studentId, name, courseName } = req.body;

        // Validate student ID format
        if (!/^\d{4}$/.test(studentId)) {
            return res.status(400).json({
                success: false,
                error: 'Student ID must be a 4-digit number'
            });
        }

        // Check if certificate already exists
        let certificate = await Certificate.findOne({ studentId });
        
        if (!certificate) {
            // Create new certificate
            certificate = await Certificate.create({
                studentId,
                name,
                courseName
            });
        }

        res.status(201).json({
            success: true,
            data: certificate
        });

    } catch (error) {
        console.error('Error in generateCertificate:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Get certificate by student ID
// @route   GET /api/certificate/:studentId
// @access  Public
exports.getCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ 
            studentId: req.params.studentId 
        });

        if (!certificate) {
            return res.status(404).json({
                success: false,
                error: 'No certificate found for this student ID'
            });
        }

        res.status(200).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        console.error('Error in getCertificate:', error);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}; 