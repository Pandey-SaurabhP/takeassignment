import React, { useState } from 'react';
import axios from 'axios';
import './FormContainer.css'; // Import the CSS file

const FormComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        preferredLanguage: '',
        stdin: '',
        sourceCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://tufassignment.onrender.com/savetodb', formData);
            alert('Form submitted successfully!');
        } 
        catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div className="form-container">
            
            <div className="form-side-left">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="preferredLanguage">Preferred Code Language:</label>
                        <select
                            id="preferredLanguage"
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            onChange={handleChange}
                        >
                            <option value="">Select Language</option>
                            <option value="C++">C++</option>
                            <option value="Java">Java</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="stdin">Standard Input (stdin):</label>
                        <textarea className='text-area-stdin'
                            id="stdin"
                            name="stdin"
                            value={formData.stdin}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="form-side">
                <div className='source-code-container'>
                    <label htmlFor="sourceCode">Source Code:</label>
                    <textarea className='text-area-source'
                        id="sourceCode"
                        name="sourceCode"
                        value={formData.sourceCode}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormComponent;
