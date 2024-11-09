import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../css/alumnidetails.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function AlumniDetails() {
  const { id } = useParams();
  console.log("ID:", id); // Add this line to check if the id is correctly retrieved
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://csjmcdualumni-api.vercel.app/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();

    // Ensure leading zeros for single-digit days and months
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <div className="alumni-details">
      <h5>Alumni Details</h5>
      <div className="card shadow-sm" style={{ width: "100%" }}>
        <div className="card-body">
          <div className="row">
            <div className="">
              <div className="">
                <div className="">
                  <div className="main-container">
                    <div className="left-part">
                      <img
                        src={user.upload_profile_picture}
                        alt={user.full_name}
                        className="top-image"
                        id="card-image"
                      />
                      <div className="social-div">
                        {user.facebook && (
                          <a
                            href={user.facebook}
                            className="me-4 text-reset social-icon"
                          >
                            <MDBIcon fab icon="facebook" />
                          </a>
                        )}
                        {user.twitter && (
                          <a
                            href={user.twitter}
                            className="me-4 text-reset social-icon"
                          >
                            <MDBIcon fab icon="twitter" />
                          </a>
                        )}
                        {user.website && (
                          <a
                            href={user.website}
                            className="me-4 text-reset social-icon"
                          >
                            <MDBIcon fab icon="google" />
                          </a>
                        )}
                        {user.instagram && (
                          <a
                            href={user.instagram}
                            className="me-4 text-reset social-icon"
                          >
                            <MDBIcon fab icon="instagram" />
                          </a>
                        )}
                        {user.linkedin && (
                          <a
                            href={user.linkedin}
                            className="me-4 text-reset social-icon"
                          >
                            <MDBIcon fab icon="linkedin" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="details-text">
                      <p>
                        <b>Full Name:</b>{" "}
                        <span className="full_name">
                          &nbsp;&nbsp;{user.full_name}
                        </span>
                      </p>
                      <p>
                        <b>Date of Birth:</b>{" "}
                        <span className="date_of_birth">
                          &nbsp;&nbsp;{formatDate(user.date_of_birth)}
                        </span>
                      </p>
                      <p>
                        <b>Gender:</b>{" "}
                        <span className="gender">
                          &nbsp;&nbsp;{user.gender}
                        </span>
                      </p>
                      <p>
                        <b>Email:</b>{" "}
                        <span className="email">&nbsp;&nbsp;{user.email}</span>
                      </p>
                      {/* <p>
                        <b>Phone Number:</b> <span className="phone_number">&nbsp;&nbsp;{user.phone_number}</span>
                      </p> */}
                      <p>
                        <b>Address:</b>{" "}
                        <span className="address">
                          &nbsp;&nbsp;{user.address}
                        </span>
                      </p>
                    </div>
                    <div className="details-text">
                      <p>
                        <b>Degree Obtained:</b>{" "}
                        <span className="degree">
                          &nbsp;&nbsp;{user.degree_obtained}
                        </span>
                      </p>
                      <p>
                        <b>Year of Graduation:</b>
                        <span className="year_of_graduation">
                          &nbsp;&nbsp;{user.year_of_graduation}
                        </span>
                      </p>
                      <p>
                        <b>Current Job Title:</b>
                        <span className="current_job_title">
                          &nbsp;&nbsp;{user.current_job_title}
                        </span>
                      </p>
                      <p>
                        <b>Company / organization:</b>
                        <span className="company_or_organization">
                          &nbsp;&nbsp;{user.company_or_organization}
                        </span>
                      </p>
                      {/* <p>
                        <b>Event Invitations:</b><span className="event_invitations">&nbsp;&nbsp;{user.event_invitations}</span>
                      </p>
                      <p>
                        <b>Volunteering:</b> <span className="volunteering">&nbsp;&nbsp;{user.volunteering}</span>
                      </p>
                      <p>
                        <b>Mentoring:</b> <span className="mentoring">&nbsp;&nbsp;{user.mentoring}</span>
                      </p>
                      <p>
                        <b>Speaking at Events:</b><span className="speaking_at_events">&nbsp;&nbsp;{user.speaking_at_events}</span>
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniDetails;
