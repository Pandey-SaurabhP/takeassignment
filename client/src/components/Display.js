import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Display.css'; // Import the CSS file

const DisplayDataComponent = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`http://localhost:3001/viewsubmissions?page=${currentPage}&limit=${itemsPerPage}`);
                const response = await axios.get(`https://tufassignment.onrender.com/viewsubmissions?page=${currentPage}&limit=${itemsPerPage}`);
                setData(response.data.map(submission => ({ ...submission, expanded: false })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
        fetchTotalPages();
    }, [currentPage]);

    const fetchTotalPages = async () => {
        try {
            // const response = await axios.get(`http://localhost:3001/submissions/count`);
            const response = await axios.get('https://tufassignment.onrender.com/submissions/count');
            const totalCount = response.data.count;
            const totalPages = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching total pages:', error);
        }
    };

    const toggleExpand = (index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], expanded: !newData[index].expanded };
            return newData;
        });
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const renderSourceCode = (sourceCode, index) => {
        const submission = data[index];
        const lines = sourceCode.split('\n');
        const displayedLines = submission.expanded ? lines : lines.slice(0, 10);
        const displayedCode = displayedLines.join('\n');
    
        if (submission.expanded || lines.length <= 10) {
            return displayedCode;
        } else {
            return (
                <div>
                    {displayedCode}
                    {/* <button onClick={() => toggleExpand(index)} className="expand-button">
                        Show More
                    </button> */}
                </div>
            );
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="display-container">
            <h2 className="submissions-heading">Submissions</h2>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>

            <table className="submissions-table">
                <thead>
                    <tr>
                        <th className="username">Username</th>
                        <th className="preferred-language">Preferred Language</th>
                        <th className="standard-input">Standard Input (stdin)</th>
                        <th className="source-code">Source Code</th>
                        <th className="timestamp">Timestamp</th> {/* New column for timestamp */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((submission, index) => (
                        <tr key={index}>
                            <td className="username">{submission.username}</td>
                            <td className="preferred-language">{submission.prelang}</td>
                            <td className="standard-input" style={{ whiteSpace: 'pre-line' }}>{submission.stdin}</td>
                            <td className="source-code" style={{ whiteSpace: 'pre-line' }}>
                                {renderSourceCode(submission.source, index)}
                                <br></br>
                                <button onClick={() => toggleExpand(index)} className="expand-button">
                                    {submission.expanded ? 'Show Less' : 'Show More'}
                                </button>
                            </td>
                            <td className="timestamp">{formatTimestamp(submission.uploadtime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayDataComponent;
