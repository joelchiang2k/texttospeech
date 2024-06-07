import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState({ name: false, email: false, message: false });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormError({ ...formError, [name]: !value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setFormError({
        name: !name,
        email: !email,
        message: !message,
      });
      return;
    }

    setFormSubmitted(true);
  };

  return (
      <Container className="contact-container">
        <Typography variant="h4" className="contact-title" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" className="contact-content" paragraph>
          We'd love to hear from you! Please fill out the form below to get in touch with us.
        </Typography>
        <form className="contact-form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formError.name}
            helperText={formError.name ? 'Name is required' : ''}
            className="contact-field"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formError.email}
            helperText={formError.email ? 'Email is required' : ''}
            className="contact-field"
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={formError.message}
            helperText={formError.message ? 'Message is required' : ''}
            multiline
            rows={4}
            className="contact-field"
          />
          <Box textAlign="center">
            <Button type="submit" variant="contained" color="primary" className="contact-button">
              Submit
            </Button>
          </Box>
        </form>
        {formSubmitted && (
          <Box mt={2}>
            <Alert severity="success" onClose={() => setFormSubmitted(false)}>
              Your message has been submitted successfully!
            </Alert>
          </Box>
        )}
      </Container>
  );
};

export default Contact;
