import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import './About.css';

const About = () => {
  return (
 
      <Container className="about-container">
        <Typography variant="h4" className="about-title" gutterBottom>
          About Text2Speech
        </Typography>
        <Typography variant="body1" className="about-content" paragraph>
          Welcome to Text2Speech, your go-to application for converting written text into natural-sounding speech. Whether you're looking to bring your text to life, need assistance with reading, or simply want to enjoy hands-free content consumption, Text2Speech has you covered.
        </Typography>
        <Typography variant="h6" className="about-subtitle" gutterBottom>
          Key Features:
        </Typography>
        <Box className="about-features">
          <Typography variant="body1" className="about-feature" paragraph>
            <strong>Easy Text Conversion:</strong> Simply enter your text, and our application will quickly convert it into speech.
          </Typography>
          <Typography variant="body1" className="about-feature" paragraph>
            <strong>Voice Selection:</strong> Choose from a variety of voices, including Joanna, Matthew, Ivy, Joey, and Justin, to find the one that best suits your needs.
          </Typography>
          <Typography variant="body1" className="about-feature" paragraph>
            <strong>Playback Controls:</strong> Play, pause, repeat, and adjust the playback speed of the synthesized speech to match your preference.
          </Typography>
          <Typography variant="body1" className="about-feature" paragraph>
            <strong>Random Quote Generation:</strong> Generate random quotes for inspiration or fun with a single click.
          </Typography>
          <Typography variant="body1" className="about-feature" paragraph>
            <strong>User-Friendly Interface:</strong> Our intuitive and sleek design ensures a seamless and enjoyable user experience.
          </Typography>
        </Box>
      </Container>

  );
};

export default About;
