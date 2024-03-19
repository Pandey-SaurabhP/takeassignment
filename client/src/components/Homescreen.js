import React from 'react';
import { Link } from 'react-router-dom';
import './Homescreen.css'; // Import the CSS file

const HomeScreen = () => {
    return (
        <div className="home-screen-container">
            <h1>Home Screen</h1>
            <div>
                <Link to="/display">
                    <button className="home-screen-button">Display Submissions</button>
                </Link>
                <Link to="/submit">
                    <button className="home-screen-button">Submit Form</button>
                </Link>
            </div>
        </div>
    );
};

export default HomeScreen;
