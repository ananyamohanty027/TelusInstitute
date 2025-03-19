/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { name, phone, email, subject, message } = formData;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!name || !phone || !email || !message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill out all required fields.'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          setSubmitStatus({
            type: 'success',
            message: 'Thank you for your message! We will get back to you soon.'
          });
          setFormData({
            name: '',
            phone: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to submit the form. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="contact-container">
      <div className="container">
        <h1>Get in Touch</h1>
        <p>Fill up the form to get in touch with us.</p>

        {submitStatus && (
          <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="contact-box">
          {/* Left side form */}
          <div className="container-left">
            <h3>Fill the Form*</h3>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-group">
                  <label>Name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Phone*</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="+91 1234567890"
                    value={phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Email*</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Inquiry"
                    value={subject}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <label>Message*</label>
              <textarea
                rows="10"
                id="message"
                placeholder="Enter your Message"
                value={message}
                onChange={handleInputChange}
                required
              ></textarea>

              <button type="submit" disabled={loading}>
                {loading ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

          {/* Right side contact information */}
          <div className="container-right">
            <h3>Reach Us</h3>
            <table>
              <tbody>
                <tr>
                  <td><FontAwesomeIcon icon={faEnvelope} /> Email: </td>
                  <td>contact@msijanakpuri.com</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faPhone} /> Phone: </td>
                  <td>+91 79733 88650</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: </td>
                  <td>
                    TelusInstitute <br />
                    Street No 05, Dagana Rd, near Ramgarhia Chowk, Labh Nagar, Subhash Nagar, Hoshiarpur, <br />
                    Punjab - 146001, India
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.7663198358628!2d75.89119969603107!3d31.53057747871332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391afd668f24d407%3A0xfa9ba4877f17c3e2!2sTelus%20Institute%20%7C%20Computer%20Training%20Center%20%7C%20Basic%20Computer%20%7C%20Tally%20%7C%20Advance%20Excel%20%7C%20Spoken%20English%20Course%20in%20Hoshiarpur.!5e0!3m2!1sen!2sin!4v1727327979051!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: '0' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
