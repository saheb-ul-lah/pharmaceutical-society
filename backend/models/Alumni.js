const mongoose = require('mongoose');

const DegreeSchema = new mongoose.Schema({
    degree: {
        type: String,
    },
    year: {
        type: Number,
    }
});

const AlumniSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    degrees:[DegreeSchema]
    ,
    jobTitle: {
        type: String,
    },
    company: {
        type: String,
    },
    companyLocation: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    twitter: {
        type: String,
    },
    facebook: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Alumni', AlumniSchema);
