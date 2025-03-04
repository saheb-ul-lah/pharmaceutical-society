import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useAuth0 } from "@auth0/auth0-react";
import '../css/slider.css'
// Import images
import firstImage from "../images/carousel/1st.jpg";
import secondImage from "../images/carousel/2nd.jpg";
import thirdImage from "../images/carousel/3rd.jpg";
import fourthImage from "../images/carousel/4th.jpg";

function Slider() {
  const [index, setIndex] = useState(0);
  const { user, isAuthenticated } = useAuth0();
  const [testimonials, setTestimonials] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('https://csjmcdualumni-api.vercel.app/users/testimonial');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://csjmcadmin-api.vercel.app/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchTestimonials();
    fetchNotifications();
  }, []);

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={firstImage}
            alt="First slide"
            style={{ objectFit: "cover", height: "500px", filter: "brightness(50%)" }}
          />
          <Carousel.Caption>
            <h3 style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "40px", marginBottom: "20px" }}>
              Welcome back {isAuthenticated ? <span style={{ color: "yellow" }}>{user.given_name}</span> : null}!
            </h3>
            <p style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "20px", marginBottom: "50px" }}>
              Pharmaceutical Society, Dibrugarh University <br /> Alumni & Student Community
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={secondImage}
            alt="Second slide"
            style={{ objectFit: "cover", height: "500px", filter: "brightness(50%)" }}
          />
          <Carousel.Caption>
            <h3 style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "40px", marginBottom: "20px" }}>
              Welcome back {isAuthenticated ? <span style={{ color: "yellow" }}>{user.given_name}</span> : null}!
            </h3>
            <p style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "20px", marginBottom: "50px" }}>
            Pharmaceutical Society, Dibrugarh University <br /> Alumni & Student Community
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={thirdImage}
            alt="Third slide"
            style={{ objectFit: "cover", height: "500px", filter: "brightness(50%)" }}
          />
          <Carousel.Caption>
            <h3 style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "40px", marginBottom: "20px" }}>
              Welcome back {isAuthenticated ? <span style={{ color: "yellow" }}>{user.given_name}</span> : null}!
            </h3>
            <p style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "20px", marginBottom: "50px" }}>
            Pharmaceutical Society, Dibrugarh University <br /> Alumni & Student Community
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={fourthImage}
            alt="Fourth slide"
            style={{ objectFit: "cover", height: "500px", filter: "brightness(50%)" }}
          />
          <Carousel.Caption>
            <h3 style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "40px", marginBottom: "20px" }}>
              Welcome back {isAuthenticated ? <span style={{ color: "yellow" }}>{user.given_name}</span> : null}!
            </h3>
            <p style={{ textShadow: "2px 2px 3px #000000", fontFamily: "Montserrat", fontSize: "20px", marginBottom: "50px" }}>
            Pharmaceutical Society, Dibrugarh University <br /> Alumni & Student Community
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section className="container mt-5">
        <div className="row">
          <div className="col-md-6 mt-5">
            <h2 style={{ fontFamily: "Montserrat", fontSize: "25px", fontWeight: "700" }}>
              ABOUT US
            </h2>
            <p style={{ fontFamily: "Josefin Sans", fontSize: "16px" }}>
            The "Pharmaceutical Society, Dibrugarh University" was founded in 1986 in the Department of Pharmaceutical Sciences, Dibrugarh University as a professional body of pharmacy by the teachers, and students of the department. Since its establishment, the society has been serving as a professional forum for organizing various professional and socio-cultural activities. 
            </p>
            <Link
              to="/about"
              className="btn btn-primary"
              style={{
                fontFamily: "Montserrat",
                border: "2px solid black",
                color: "black",
                padding: "10px 15px",
                margin: "8px 0",
                fontWeight: "600",
                fontSize: "15px",
                backgroundColor: "beige",
                borderRadius: "10px",
              }}
            >
              Read More &nbsp;
              <i className="fa-solid fa-angles-right fa-fade fa-xl"></i>
            </Link>
          </div>
          <div className="col-md-6 mt-5">
            <h2 style={{ fontFamily: "Montserrat", fontSize: "25px", fontWeight: "700" }}>
              NOTIFICATIONS
            </h2>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <p key={index}
                  style={{
                    fontFamily: "Josefin Sans",
                    fontSize: "16px",
                    backgroundColor: "antiquewhite",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <i className="fa-solid fa-bell fa-shake"></i>&nbsp;{notification.message}
                </p>
              ))
            ) : (
              <p>No notifications available.</p>
            )}
            <Link
              to="/news-events"
              className="btn btn-outline-primary"
              style={{
                fontFamily: "Montserrat",
                border: "2px solid black",
                color: "black",
                padding: "10px 15px",
                margin: "8px 0",
                fontWeight: "600",
                fontSize: "15px",
                backgroundColor: "beige",
                borderRadius: "10px",
              }}
            >
              View All &nbsp;
              <i className="fa-solid fa-angles-right fa-fade fa-xl"></i>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

export default Slider;
