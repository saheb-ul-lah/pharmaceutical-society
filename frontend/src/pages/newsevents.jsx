import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Carousel, Spinner } from 'react-bootstrap';
import seminar101 from '../images/news-events/seminar1/seminar101.jpg';
import seminar102 from '../images/news-events/seminar1/seminar102.jpg';
import seminar103 from '../images/news-events/seminar1/seminar103.jpg';
import seminar201 from '../images/news-events/seminar2/seminar201.jpg';
import seminar202 from '../images/news-events/seminar2/seminar202.jpg';
import seminar203 from '../images/news-events/seminar2/seminar203.jpg';
import seminar204 from '../images/news-events/seminar2/seminar204.jpg';
import event101 from '../images/news-events/event1/event101.jpg';
import event102 from '../images/news-events/event1/event102.jpg';

function NewsEvents() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carouselImagesLoading, setCarouselImagesLoading] = useState(false); // State to track carousel images loading

  // Sample data for news and events
  const newsEventsData = [
    {
      id: 1,
      title: 'Seminar (19/02/2024)',
      images: [seminar101, seminar102, seminar103],
      description: '"Renowned Professor Enlightens Department with Inspirational Speech"',
      content: 'We had an enlightened interactive session today, with Abhijit Bora Sir, Professor and HOD, Department of Journalism and Mass Communication, Tezpur University. He shared his valuable insights upon achieving success not just in the field, but in life itself.',
    },
    {
      id: 2,
      title: 'Seminar (08/09/2023)',
      images: [seminar201,seminar202,seminar203,seminar204],
      description: '"Centre for Studies in Journalism and Mass Communication Hosts Interactive Session with Filmmaker Rima Das"',
      content: 'The Centre for Studies in Journalism and Mass Communication today organised an interactive session with renowned filmmaker Miss Rima Das. The "Village Rockstars" Director opened up with the students on her journey in filmmaking. The session was quite enlightening and lively. Miss Priyanka Baruah, the co-producer of "Mur Hekh Gaan" , who is also associated with the movie promotional-marketing sector, was also present in the session. The Centre was greatly honoured to have the presence of such inspirational personalities.',
    },
    {
      id: 3,
      title: 'Event (08/09/2023)',
      images: [event101,event102],
      description: "Centre Celebrates 97th Birth Anniversary of Sudhakantha Dr. Bhupen Hazarika",
      content: "The Centre for Studies in Journalism and Mass Communication commemorated the 97th birth anniversary of Sudhakantha Dr. Bhupen Hazarika with a solemn ceremony. Faculty and students paid tribute to the legendary musician by lighting candles and reminiscing about his timeless songs and his immense contributions to Assam and India. Dr. Bhupen Hazarika's unparalleled legacy continues to inspire generations, and the event served as a heartfelt homage to his life and work.",
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCarouselImagesLoading(true); // Start loading carousel images
  };

  useEffect(() => {
    // Simulating image loading
    setLoading(false);
    // Simulating carousel image loading delay
    const timeout = setTimeout(() => {
      setCarouselImagesLoading(false);
    }, 1000); // Adjust the timeout value as needed
    return () => clearTimeout(timeout); // Clean up on component unmount
  }, [selectedItem]);

  return (
    <Container>
      <h2 className="mt-5 mb-4">News & Events</h2>
      <Row>
        <Col md={4}>
          <ListGroup>
            {newsEventsData.map((item) => (
              <ListGroup.Item
                action
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                {item.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            selectedItem && (
              <Card style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)" }}>
                {carouselImagesLoading ? ( // Show spinner while carousel images are loading
                  <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <React.Fragment>
                    {selectedItem.images.length > 1 ? (
                      <Carousel>
                        {selectedItem.images.map((image, index) => (
                          <Carousel.Item key={index}>
                            <img
                              className="d-block w-100"
                              src={image}
                              alt={`Slide ${index + 1}`}
                              style={{ maxHeight: "300px", objectFit: "cover", objectPosition: "center center" }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    ) : (
                      <Card.Img
                        variant="top"
                        src={selectedItem.images[0]}
                        style={{ maxHeight: "300px", objectFit: "cover", objectPosition: "center center" }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{selectedItem.title}</Card.Title>
                      <Card.Text>{selectedItem.description}</Card.Text>
                      <Card.Text>{selectedItem.content}</Card.Text>
                      <button className="btn btn-primary" onClick={() => setSelectedItem(null)}>
                        Close
                      </button>
                    </Card.Body>
                  </React.Fragment>
                )}
              </Card>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsEvents;
