const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        type: String,
        required: true,
        enum: ['B. Pharm', 'M. Pharm', 'PhD'],
    },
    yearOfPassing: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Student', studentSchema);
