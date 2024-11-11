import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/alumniForm.css'; // Ensure this CSS file exists

const AlumniForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [degrees, setDegrees] = useState([{ degree: '', year: '' }]);
  const [imagePreview, setImagePreview] = useState(null);

  const { control, handleSubmit, setValue, watch, register, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isAuthenticated || !user || !user.email) {
      setIsLoading(false);
      return;
    }

    const email = user.email;
    axios
      .get(`https://csjmcdualumni-api.vercel.app/users/check/${encodeURIComponent(email)}`)
      .then((response) => {
        setUserExists(response.data.exists);
      })
      .catch((error) => {
        console.error('Error checking user:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (userExists) {
      toast.error('You have already submitted the form.');
    }
  }, [userExists]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        alert('Image size must be less than 200KB');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDegree = () => {
    setDegrees([...degrees, { degree: '', year: '' }]);
  };

  const removeDegree = (index) => {
    setDegrees(degrees.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    console.log('Form data submitted: ', data);
    // Submit form data using axios.post
  };

  if (!isAuthenticated) {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <p>Please log in to access the form.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (userExists) {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <p>You have already submitted the form.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Main form content
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="alumni-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Pharma Society Registration Form</h1>
              <p>Please fill out the form with your information.</p>

              <section>
                <h2>Personal Information</h2>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <Controller
                    control={control}
                    name="fullName"
                    render={({ field }) => <input id="fullName" {...field} placeholder="Enter your full name" />}
                    rules={{ required: 'Full Name is required' }}
                  />
                  {errors.fullName && <span>{errors.fullName.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth *</label>
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => <input id="dob" type="date" {...field} />}
                    rules={{ required: 'Date of Birth is required' }}
                  />
                  {errors.dob && <span>{errors.dob.message}</span>}
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <div className="radio-group">
                    <label>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => <input type="radio" {...field} value="male" />}
                      />
                      Male
                    </label>
                    <label>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => <input type="radio" {...field} value="female" />}
                      />
                      Female
                    </label>
                    <label>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => <input type="radio" {...field} value="other" />}
                      />
                      Other
                    </label>
                  </div>
                  {errors.gender && <span>{errors.gender.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => <input id="email" {...field} type="email" placeholder="Enter your email address" />}
                    rules={{ required: "Email is required" }}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => <input id="phone" {...field} type="tel" placeholder="Enter your phone number" />}
                    rules={{ required: 'Phone number is required' }}
                  />
                  {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => <textarea id="address" {...field} placeholder="Enter your current address" />}
                    rules={{ required: 'Address is required' }}
                  />
                  {errors.address && <span>{errors.address.message}</span>}
                </div>
              </section>

              <section>
                <h2>Education Details</h2>
                {degrees.map((degree, index) => (
                  <div key={index} className="degree-entry">
                    <div className="form-group">
                      <label htmlFor={`degree-${index}`}>Degree Obtained *</label>
                      <Controller
                        control={control}
                        name={`degree-${index}`}
                        render={({ field }) => (
                          <select id={`degree-${index}`} {...field}>
                            <option value="">Select a degree</option>
                            <option value="B. Pharm">B. Pharm</option>
                            <option value="M. Pharm">M. Pharm</option>
                            <option value="PhD">PhD</option>
                          </select>
                        )}
                        rules={{ required: 'Degree is required' }}
                      />
                      {errors[`degree-${index}`] && <span>{errors[`degree-${index}`].message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor={`year-${index}`}>Year of Graduation *</label>
                      <Controller
                        control={control}
                        name={`year-${index}`}
                        render={({ field }) => <input id={`year-${index}`} type="number" {...field} />}
                        rules={{ required: 'Year of Graduation is required' }}
                      />
                      {errors[`year-${index}`] && <span>{errors[`year-${index}`].message}</span>}
                    </div>
                    {index > 0 && (
                      <button type="button" onClick={() => removeDegree(index)} className="remove-btn">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addDegree} className="add-btn">
                  Add Another Degree
                </button>
              </section>

              <section>
                <h2>Career Information</h2>
                <div className="form-group">
                  <label htmlFor="jobTitle">Current Job Title (if applicable)</label>
                  <Controller
                    control={control}
                    name="jobTitle"
                    render={({ field }) => <input id="jobTitle" {...field} type="text" placeholder="Enter your job title" />}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company/Organization</label>
                  <Controller
                    control={control}
                    name="company"
                    render={({ field }) => <input id="company" {...field} type="text" placeholder="Enter your company name" />}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyLocation">Company Location</label>
                  <Controller
                    control={control}
                    name="companyLocation"
                    render={({ field }) => <input id="companyLocation" {...field} type="text" placeholder="Enter your company location" />}
                  />
                </div>
              </section>

              <section>
                <h2>Social Handles</h2>
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn Profile</label>
                  <Controller
                    control={control}
                    name="linkedin"
                    render={({ field }) => <input id="linkedin" {...field} type="url" placeholder="Enter your LinkedIn URL" />}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="twitter">Twitter Profile</label>
                  <Controller
                    control={control}
                    name="twitter"
                    render={({ field }) => <input id="twitter" {...field} type="url" placeholder="Enter your Twitter URL" />}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="facebook">Facebook Profile</label>
                  <Controller
                    control={control}
                    name="facebook"
                    render={({ field }) => <input id="facebook" {...field} type="url" placeholder="Enter your Facebook URL" />}
                  />
                </div>
              </section>

              <section>
                <h2>Profile Picture</h2>
                <div className="form-group">
                  <label htmlFor="profile-picture">Upload Profile Picture</label>
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    {...register('profilePicture')}
                    onChange={handleImageUpload}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Profile Preview" />
                    </div>
                  )}
                </div>
              </section>

              <button type="submit" className="submit-btn">
                Submit Registration
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AlumniForm;
