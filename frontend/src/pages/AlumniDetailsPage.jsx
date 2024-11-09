import React from 'react';
import AlumniDetails from './AlumniDetails';
import { useParams } from 'react-router-dom';

const AlumniDetailsPage = () => {
    const { id } = useParams(); // Get user ID from URL
    return (
        <div>
            <AlumniDetails userId={id} /> {/* Pass user ID as prop */}
        </div>
    );
}

export default AlumniDetailsPage;
