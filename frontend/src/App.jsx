import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigationbar from './components/NavBar';
import Alumni from './pages/alumni';
import Student from './pages/student';
import About from './pages/about';
import NewsEvents from './pages/newsevents';
import SignUp from './pages/signup';
import Login from './pages/login';
import AlumniDetailsPage from "./pages/AlumniDetailsPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import BelowBar from "./components/BelowBar";
import Slider from "./components/slider";
import TeamSection from "./components/teamSection"
import UserProfile from './pages/profile';
import AlumniForm from './pages/alumni-form';
import StudentForm from './pages/student-form';
import Posts from './pages/Posts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/customScrollbar.css';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
function PageNotFound() {
  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} className="text-center">
          <h1>404 Not Found</h1>
          <p>Oops! The page you are looking for does not exist.</p>
          <Button as={Link} to="/" variant="primary">Go to Home</Button>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
    return (
        <Router>
            <Navigationbar/>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Slider/>} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/alumni/:id" element={<AlumniDetailsPage />} />
                <Route path="/student" element={<Student />} />
                <Route path="/student/:id" element={<StudentDetailsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/news-events" element={<NewsEvents />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/team-section" element={<TeamSection />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/alumniform" element={<AlumniForm />} />
                <Route path="/studentform" element={<StudentForm />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <BelowBar/>
        </Router>
    );
}

export default App;
