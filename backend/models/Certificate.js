const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4
    },
    name: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Certificate', certificateSchema); 