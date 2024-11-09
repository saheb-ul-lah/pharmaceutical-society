import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/studentForm.css'; // Ensure this CSS file exists

const StudentForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

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
          <div className="student-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Student Registration Form</h1>
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
                  <label htmlFor="email">Email *</label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => <input id="email" {...field} type="email" placeholder="Enter your email address" />}
                    rules={{ required: 'Email is required' }}
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
              </section>

              <section>
                <h2>Course Information</h2>
                <div className="form-group">
                  <label htmlFor="course">Course Enrolled *</label>
                  <Controller
                    control={control}
                    name="course"
                    render={({ field }) => (
                      <select id="course" {...field}>
                        <option value="">Select a course</option>
                        <option value="B. Pharm">B. Pharm</option>
                        <option value="M. Pharm">M. Pharm</option>
                        <option value="PhD">PhD</option>
                      </select>
                    )}
                    rules={{ required: 'Course is required' }}
                  />
                  {errors.course && <span>{errors.course.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="yearOfPassing">Year of Passing *</label>
                  <Controller
                    control={control}
                    name="yearOfPassing"
                    render={({ field }) => <input id="yearOfPassing" type="number" {...field} placeholder="Enter your year of passing" />}
                    rules={{ required: 'Year of Passing is required' }}
                  />
                  {errors.yearOfPassing && <span>{errors.yearOfPassing.message}</span>}
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

export default StudentForm;
