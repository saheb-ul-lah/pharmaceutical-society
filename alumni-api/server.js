const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
const DB = 'mongodb+srv://csjmcadmin:dibrugarh786004@alumni.mft5fe5.mongodb.net/?retryWrites=true&w=majority&appName=alumni'

// Connect to MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create MongoDB schema and model
const userSchema = new mongoose.Schema({
    full_name: String,
    date_of_birth: Date,
    gender: String,
    email: String,
    phone_number: String,
    address: String,
    degree_obtained: String,
    year_of_graduation: String,
    current_job_title: String,
    company_or_organization: String,
    newsletter_subscription: String,
    event_invitations: String,
    volunteering: String,
    mentoring: String,
    speaking_at_events: String,
    testimonial: String,
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    website: String,
    upload_profile_picture: String,
    terms_and_conditions: String,
    date: Date,
  
}, { collection: 'posts' });

const User = mongoose.model('User', userSchema);
// Define the route for getting users who have given testimonials first
app.get('/users/testimonial', async (req, res) => {
    try {
        console.log("Fetching users with testimonials...");
        const usersWithTestimonials = await User.find({ testimonial: { $ne: null, $ne: '' } });
        console.log("Users found:", usersWithTestimonials.length);
        res.json(usersWithTestimonials);
    } catch (error) {
        console.error('Error fetching users with testimonials:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by email
app.get('/users/email/:encodedEmail', async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.encodedEmail);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Check if user exists by email
app.get('/users/check/:encodedEmail', async (req, res) => {
    try {
      const email = decodeURIComponent(req.params.encodedEmail);
      const user = await User.findOne({ email });
      res.json({ exists: !!user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update user data
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/users', async (req, res) => {
    const user = new User({
        full_name: req.body.full_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        email: req.body.email,
        phone_number: req.body.phone_number,
        address: req.body.address,
        degree_obtained: req.body.degree_obtained,
        year_of_graduation: req.body.year_of_graduation,
        current_job_title: req.body.current_job_title,
        company_or_organization: req.body.company_or_organization,
        newsletter_subscription: req.body.newsletter_subscription,
        event_invitations: req.body.event_invitations,
        volunteering: req.body.volunteering,
        mentoring: req.body.mentoring,
        speaking_at_events: req.body.speaking_at_events,
        suggestions_or_feedback: req.body.suggestions_or_feedback,
        upload_profile_picture: req.body.upload_profile_picture,
        terms_and_conditions: req.body.terms_and_conditions,
        date: req.body.date
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

