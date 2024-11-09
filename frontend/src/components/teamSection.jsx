import React from "react";
import '../css/teamSection.css';
import KalyanImage from '../images/teams/kalyan.jpg';

const teamMembers = [
  {
    name: "Michael Doe",
    role: "Property Specialist",
    image: KalyanImage,
    description: "You can rely on our amazing features list and also our customer services will be great experience.",
  },
  {
    name: "Jane Smith",
    role: "Marketing Expert",
    image: "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg",
    description: "Helping you find and reach your ideal audience with tailored marketing solutions.",
  },
  {
    name: "John Roe",
    role: "Financial Advisor",
    image: "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t3.jpg",
    description: "Providing financial insights to help you manage your assets effectively.",
  },
  // Add more team members as needed
];

const TeamSection = () => (
  <div className="container text-center mt-5 mb-2">
    <h1 className="mb-0">Meet our team</h1>
    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
    <div className="container mt-3 mb-2">
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-lg-3 mb-4" key={index}>
            <div className="bg-white p-3 text-center rounded box">
              <img
                src={member.image}
                alt={member.name}
                className="img-responsive rounded-circle"
                width="90"
              />
              <h5 className="mt-3 name">{member.name}</h5>
              <h6 className="work d-block">{member.role}</h6>
              <div className="mt-4 about">
                <span>{member.description}</span>
              </div>
              <div className="mt-4">
                <h6 className="v-profile">View Profile</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TeamSection;
