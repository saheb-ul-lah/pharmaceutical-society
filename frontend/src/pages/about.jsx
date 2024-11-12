import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const objectives = [
  "To foster a strong theoretical foundation and professional skills in pharmacy students.",
  "To provide students with access to up-to-date equipment and resources in pharmaceutical sciences.",
  "To facilitate internships that offer hands-on training and opportunities to work with leading professionals.",
  "To encourage ethical practices in the professional application of pharmaceutical knowledge.",
  "To ensure students receive guidance from a diverse faculty with both academic and professional expertise in pharmaceutical sciences."
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
      <h2 className="text-center mb-4">About the Pharmaceutical Society</h2>
      
      <Row>
        <Col>
          <CardContent
            text="The mission of the Pharmaceutical Society, Dibrugarh University, is to support the professional development of pharmacy students through networking, mentorship, and access to resources. The Society emphasizes educational workshops, seminars, discussions, and guest lectures to keep members updated with the latest advancements in pharmacy. In its commitment to public health, the Society organizes healthcare camps, counseling programs, and awareness campaigns focused on drug safety, disease prevention, and healthcare education."
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
            text="The Centre collaborates with international institutions for research and educational exchanges. It actively participates in initiatives that strengthen public health education, enabling students to develop communication and research skills critical to pharmaceutical and healthcare industries."
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardContent
            title="Departmental Activities"
            text="The Society hosts workshops, seminars, and guest lectures, enhancing practical knowledge in pharmacy. Internship opportunities at prominent pharmaceutical organizations are also facilitated to provide real-world exposure. Activities are designed to broaden students' understanding and skill sets within the pharmaceutical field."
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CardContent
            title="Placement"
            text="The Society maintains strong connections with various healthcare and pharmaceutical organizations to assist students in securing career placements. Alumni have found positions in prominent companies, including major hospitals, research centers, and pharmaceutical firms. The Society also collaborates with Dibrugarh University's Placement Cell to support students in their job search."
          />
        </Col>
      </Row>
    </Container>
  );
}

export default About;
