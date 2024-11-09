import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const objectives = [
  "To enable the learner to develop sound theoretical knowledge and professional skills and competencies in media and communication studies.",
  "To train the learners with equipment and infrastructure to understand the converging world of communications and adapt to the latest developments in the field.",
  "To enable the learners to undergo thorough internships that afford them hands-on training and an opportunity to work with the leading professionals of the region and nation.",
  "To enable the learners to implement ethical behaviors in their own professional practice of mass communication and usage of mass media tools.",
  "To enable the learners to receive guidance from a diverse field of faculties with a mix of academic and professional backgrounds to ensure excellence in the field of communication and journalism."
];

const CardContent = ({ title, text, list }) => (
  <Card className="shadow mb-4">
    <Card.Body style={{ height: "auto" }}>
      {title && <Card.Title className="mb-4">{title}</Card.Title>}
      {text && <Card.Text>{text}</Card.Text>}
      {list && (
        <ListGroup variant="flush">
          {list.map((item, idx) => (
            <ListGroup.Item key={idx}>
              <i className="fas fa-check me-2 text-primary"></i>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card.Body>
  </Card>
);

function About() {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">About the Centre</h2>
      
      <Row>
        <Col>
          <CardContent
            text="The Centre for Studies in Journalism and Mass Communication, Dibrugarh University, is one of the leading institutions of higher learning in the field of communication and media studies in India. The Centre offers an M.A in Mass Communication (MAMC) course with specializations in print, electronic, new media, and public affairs. With faculty trained in reputed institutions and well-equipped studios and computer laboratories, the Centre has established itself since 2008. It provides balanced inputs in both theory and practice of mass communication, supported by a panel of visiting faculty, including scholars, journalists, and filmmakers."
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardContent title="Major Objectives" list={objectives} />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardContent
            title="International Collaboration"
            text="The Centre is currently engaged with UNICEF for the multidisciplinary master's programme on Communication for Sanitation, Hygiene and Health (CSH&H). This joint initiative with UNICEF is designed to train communication experts for public health promotion. It enables learners to effectively communicate Health, Hygiene, and Sanitation concepts, preparing them as professional change agents for community development."
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardContent
            title="Departmental Activities"
            text="Students produce radio programs and documentary films as part of their curriculum. Internship opportunities are arranged in reputed media organizations to give students exposure to various media practices. The Centre regularly screens award-winning films and documentaries, invites guest speakers, and organizes workshops and seminars to broaden students' knowledge and skills."
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardContent
            title="Placement"
            text="The Centre has a strong placement record with alumni in various public and private organizations, media industries, and educational institutions. Recent recruiters include UNICEF, Indian Oil Corporation, Hindustan Unilever, All India Radio, Radio Mirchi, News Live, The Assam Tribune, GenPac, The Telegraph, and Pratidin Time. The Centre coordinates with Dibrugarh University's Placement Cell to assist students in their career placement."
          />
        </Col>
      </Row>
    </Container>
  );
}

export default About;
