import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Certificate.css';
import logo from "../../components/assets/images/logo-black.png";
const Certificate = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        courseName: ''
    });

    const [certificate, setCertificate] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const certificateRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrint = useReactToPrint({
        content: () => certificateRef.current,
        pageStyle: `
            @page {
                size: A4 landscape;
                margin: 0;
            }
            @media print {
                html, body {
                    height: 100%;
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: hidden;
                }
                .certificate-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        `
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setCertificate(data.data);
            } else {
                setError(data.error || 'Failed to generate certificate');
            }
        } catch (error) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="certificate-container">
            <div className="form-section">
                <h2>Get Your Certificate</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Student ID (4 digits)</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            pattern="[0-9]{4}"
                            maxLength="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Certificate'}
                    </button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>

            {certificate && (
                <div className="certificate-section">
                    <div ref={certificateRef} className="certificate-wrapper">
                        <div className="certificate">
                            <div className="certificate-content">
                                <div className="certificate-header">
                                    <h1>Certificate of Completion</h1>
                                    <img src= {logo}alt="Institute Logo" className="logo" />
                                </div>
                                <div className="certificate-body">
                                    <p className="certificate-text">This is to certify that</p>
                                    <h2 className="student-name">{certificate.name}</h2>
                                    <p className="certificate-text">
                                        has successfully completed the course in
                                    </p>
                                    <h3 className="course-name">{certificate.courseName}</h3>
                                    <p className="certificate-id">Certificate ID: {certificate.studentId}</p>
                                    <p className="issue-date">
                                        Issued on: {new Date(certificate.issueDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="certificate-footer">
                                    <div className="signature">
                                        <div className="signature-line"></div>
                                        <p>Director</p>
                                    </div>
                                    <div className="signature">
                                        <div className="signature-line"></div>
                                        <p>Course Instructor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handlePrint} className="print-button">
                        Print/Download Certificate
                    </button>
                </div>
            )}
        </div>
    );
};

export default Certificate; 