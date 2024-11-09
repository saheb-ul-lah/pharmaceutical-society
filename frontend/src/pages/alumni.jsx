import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AlumniDetailsPage from './AlumniDetailsPage';
import '../css/alumni.css';
import { Spinner } from 'react-bootstrap';

function Alumni() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null); // State to track selected year for filtering

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://csjmcdualumni-api.vercel.app/users');
                setUsers(response.data);
                setSearchResults(response.data);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const results = users.filter(user =>
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
        setCurrentPage(1);
    };

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleChangeYear = year => {
        setSelectedYear(year);
        filterUsersByYear(year);
    };

    const filterUsersByYear = year => {
        console.log('Selected Year:', year); // Debugging information
        const results = users.filter(user =>
            user.year_of_graduation === year
        );
        console.log('Filtered Users:', results); // Debugging information
        setSearchResults(results);
        setCurrentPage(1);
        if (results.length === 0) {
            setSearchResults([]);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleCardClick = user => {
        setSelectedUser(user);
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <div className="d-flex justify-content-center mt-3">
                <select value={selectedYear} onChange={e => handleChangeYear(e.target.value)} className="form-select w-25 me-2">
                    <option value="">Select Year</option>
                    {[...new Set(users.map(user => user.year_of_graduation))].sort((a, b) => b - a).map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search alumni..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="form-control w-50"
                />
                <Button variant="primary" className="ms-2" onClick={handleSearch}>
                    Search
                </Button>
            </div>
            <div className="d-flex justify-content-around flex-wrap mt-3">
                {currentUsers.length === 0 ? (
                    <p style={{ textAlign: "center" }}>Oops! No User Found.</p>
                ) : (
                    currentUsers.map((user, index) => (
                        <Link to={`/alumni/${user._id}`} key={index} className="text-decoration-none">
                            <Card
                                style={{ width: '18rem', cursor: 'pointer' }}
                                className="mb-3 #alumni-card"
                                onClick={() => handleCardClick(user)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={user.upload_profile_picture}
                                    className="card-image"
                                />
                                <Card.Body className='card-body'>
                                    <Card.Title>{user.full_name}</Card.Title>
                                    <Card.Text>
                                        {user.current_job_title}
                                        <br />
                                        <strong>Year of Graduation:&nbsp;&nbsp;</strong>
                                        {user.year_of_graduation}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))
                )}
                <Pagination className="pagination">
                    <Pagination.First onClick={() => paginate(1)} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {Array.from({ length: Math.ceil(searchResults.length / usersPerPage) }, (_, i) => (
                        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(searchResults.length / usersPerPage)} />
                    <Pagination.Last onClick={() => paginate(Math.ceil(searchResults.length / usersPerPage))} />
                </Pagination>
            </div>
            {selectedUser && <AlumniDetailsPage user={selectedUser} />}
        </div>
    );
}

export default Alumni;
