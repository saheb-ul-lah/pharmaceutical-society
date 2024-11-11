require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connDB = require('./config/DB');  // Database connection
const Student = require('./models/Student');
const Alumni = require('./models/Alumni');

const app = express();
const PORT = 4250;

// Connect to the database
connDB();

// Middleware
app.use(express.json());
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });

// Root route
app.get('/', (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});

// Alumni form route
app.post('/api/alumniform', upload.single('profilePicture'), async (req, res) => {
    const alumniData = {
        fullName: req.body.fullName,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        companyLocation: req.body.companyLocation,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        degrees: req.body.degrees, // Assuming degrees is sent as a JSON string
        profilePicture: req.file ? req.file.path : null // Handle file upload
    };
    console.log();
    const alumni = new Alumni(alumniData);
    try {
        const newAlumni = await alumni.save();
        res.status(201).json({ message: "Alumni data saved successfully!", alumni: newAlumni });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error saving alumni data", error: error.message });
    }
});

// Student form route
app.post('/api/studentform', async (req, res) => {
    const studentData = {
        // Assuming the Student model has similar fields
        fullName: req.body.fullName,
        dob: req.body.dob,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        // Add other fields as necessary
    };

    const student = new Student(studentData);
    try {
        const newStudent = await student.save();
        res.status(201).json({ message: "Student data saved successfully!", student: newStudent });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error saving student data", error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});