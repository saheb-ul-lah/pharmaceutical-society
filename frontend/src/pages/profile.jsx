import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserProfile() {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone_number: '',
    address: '',
    degree_obtained: '',
    year_of_graduation: '',
    current_job_title: '',
    company_or_organization: '',
    newsletter_subscription: '',
    event_invitations: '',
    volunteering: '',
    mentoring: '',
    speaking_at_events: '',
    suggestions_or_feedback: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const email = auth0User.email;
          const response = await axios.get(`https://csjmcdualumni-api.vercel.app/users/email/${encodeURIComponent(email)}`);
          setUser(response.data);
          setFormData({
            full_name: response.data.full_name || '',
            date_of_birth: response.data.date_of_birth || '',
            gender: response.data.gender || '',
            email: response.data.email || '',
            phone_number: response.data.phone_number || '',
            address: response.data.address || '',
            degree_obtained: response.data.degree_obtained || '',
            year_of_graduation: response.data.year_of_graduation || '',
            current_job_title: response.data.current_job_title || '',
            company_or_organization: response.data.company_or_organization || '',
            newsletter_subscription: response.data.newsletter_subscription || '',
            event_invitations: response.data.event_invitations || '',
            volunteering: response.data.volunteering || '',
            mentoring: response.data.mentoring || '',
            speaking_at_events: response.data.speaking_at_events || '',
            suggestions_or_feedback: response.data.suggestions_or_feedback || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response.status === 404) {
          toast.error('Please fill up the alumni form');
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated, auth0User]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://csjmcdualumni-api.vercel.app/users/${user._id}`, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (isLoading) {
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }
  if (!isAuthenticated) return <div>Please login to view your profile</div>;
  if (!user) return <div>Loading user data..., if form filled wait for 2-3 minutes</div>;

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav
              aria-label="breadcrumb"
              className="bg-body-tertiary rounded-3 p-3 mb-4"
            >
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={user.upload_profile_picture}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">{user.full_name}</h5>
                <p className="text-muted mb-1">{user.current_job_title}</p>
                <p className="text-muted mb-4">{user.company_or_organization}</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  {user.linkedin && (
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-linkedin fa-lg"></i>
                      <a href={user.linkedin} className="mb-0">{user.linkedin}</a>
                    </li>
                  )}
                  {user.twitter && (
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-twitter fa-lg"
                        style={{ color: "#55acee" }}
                      ></i>
                      <a href={user.twitter} className="mb-0">{user.twitter}</a>
                    </li>
                  )}
                  {user.instagram && (
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      ></i>
                      <a href={user.instagram} className="mb-0">{user.instagram}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.full_name}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Date of Birth</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="date"
                        className="form-control"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.date_of_birth}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <select
                        className="form-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-muted mb-0">{formData.gender}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{formData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone Number</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{formData.phone_number}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.address}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Degree Obtained</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="degree_obtained"
                        value={formData.degree_obtained}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.degree_obtained}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Year of Graduation</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="year_of_graduation"
                        value={formData.year_of_graduation}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.year_of_graduation}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Current Job Title</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="current_job_title"
                        value={formData.current_job_title}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.current_job_title}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <hr />
                  <div className="col-sm-3">
                    <p className="mb-0">Company/Organization</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="company_or_organization"
                        value={formData.company_or_organization}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.company_or_organization}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Newsletter Subscription</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="newsletter_subscription"
                        value={formData.newsletter_subscription}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.newsletter_subscription}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Event Invitations</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="event_invitations"
                        value={formData.event_invitations}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.event_invitations}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Volunteering</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="volunteering"
                        value={formData.volunteering}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.volunteering}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mentoring</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="mentoring"
                        value={formData.mentoring}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.mentoring}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Speaking at Events</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="speaking_at_events"
                        value={formData.speaking_at_events}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-muted mb-0">{formData.speaking_at_events}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Suggestions or Feedback</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing ? (
                      <textarea
                        className="form-control"
                        name="suggestions_or_feedback"
                        value={formData.suggestions_or_feedback}
                        onChange={handleChange}
                      ></textarea>
                    ) : (
                      <p className="text-muted mb-0">{formData.suggestions_or_feedback}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="d-grid">
                  {isEditing ? (
                    <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                  ) : (
                    <button className="btn btn-primary" onClick={handleEditToggle}>Edit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
