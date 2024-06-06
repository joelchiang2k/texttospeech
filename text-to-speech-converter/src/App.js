import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Button, Typography, Box, IconButton, Slider, createTheme, ThemeProvider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RepeatIcon from '@mui/icons-material/Repeat';
import SpeedIcon from '@mui/icons-material/Speed';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useEmblaCarousel from 'embla-carousel-react';
import './App.css'; // Ensure to import the CSS file

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "system-ui", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h4: {
      fontWeight: 700, // Bold for h4
    },
    h6: {
      fontWeight: 700, // Bold for h6
    },
    body2: {
      fontWeight: 700, // Bold for body2
    },
    button: {
      fontWeight: 700, // Bold for buttons
    },
  },
});

function App() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Joanna');
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showSlider, setShowSlider] = useState(false);
  const audioRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const voices = [
    { name: 'Joanna', lang: 'en-US', image: 'https://elasticbeanstalk-us-east-1-797064849441.s3.amazonaws.com/PEOPLE_ICON-23-5121.png' },
    { name: 'Matthew', lang: 'en-US', image: 'https://elasticbeanstalk-us-east-1-797064849441.s3.amazonaws.com/iconfinder-1-avatar-2754574_120513.png' },
    { name: 'Ivy', lang: 'en-US', image: 'https://elasticbeanstalk-us-east-1-797064849441.s3.amazonaws.com/people-avatar-icon-png.png' },
    { name: 'Joey', lang: 'en-US', image: 'https://elasticbeanstalk-us-east-1-797064849441.s3.amazonaws.com/770139_man_512x512.png' },
    { name: 'Justin', lang: 'en-US', image: 'https://elasticbeanstalk-us-east-1-797064849441.s3.amazonaws.com/people-avatar-icon-png1.png' },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    setVoice(voices[selectedIndex].name);
  }, [emblaApi, voices]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (audioURL && audioRef.current) {
      const audioElement = audioRef.current;

      const handlePlay = () => {
        setIsPlaying(true);
        audioElement.playbackRate = playbackRate; // Set playback rate when playing
      };
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
        if (isRepeating) {
          audioElement.play();
        }
      };

      audioElement.addEventListener('play', handlePlay);
      audioElement.addEventListener('pause', handlePause);
      audioElement.addEventListener('ended', handleEnded);

      return () => {
        audioElement.removeEventListener('play', handlePlay);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioURL, isRepeating, playbackRate]);

  const handlePlay = () => {
    if (!text) {
      alert('Please enter text to synthesize.');
      return;
    }

    fetch('https://ec2-18-215-171-75.compute-1.amazonaws.com/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voice }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        const audioURL = URL.createObjectURL(blob);
        setAudioURL(audioURL);
        audioRef.current.src = audioURL;
        audioRef.current.play();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Speech synthesis failed. Please try again.');
      });
  };

  const handleGenerateRandomSentence = () => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setText(data.content))
      .catch((error) => alert('Failed to fetch a random sentence. Please try again.'));
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const handleSpeedChange = (event, newValue) => {
    setPlaybackRate(newValue);
    if (audioRef.current) {
      audioRef.current.playbackRate = newValue;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Text-To-Speech Converter
        </Typography>
        <Box className="text-box">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-area"
            placeholder="Enter text to convert"
          />
        </Box>
        <Box className="center-button">
          <Button variant="contained" onClick={handleGenerateRandomSentence}>
            Generate Random Quote
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" marginBottom="1rem">
          <IconButton onClick={handlePlay}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton onClick={handlePause}>
            <PauseIcon />
          </IconButton>
          <IconButton onClick={handleRepeat} color={isRepeating ? 'primary' : 'default'}>
            <RepeatIcon />
          </IconButton>
          <IconButton onClick={toggleSlider}>
            <SpeedIcon />
          </IconButton>
        </Box>
        {showSlider && (
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom="1rem">
            <Typography variant="body1">Speed: {playbackRate}x</Typography>
            <Slider
              value={playbackRate}
              min={0.5}
              max={5.0}
              step={0.1}
              onChange={handleSpeedChange}
              aria-labelledby="continuous-slider"
            />
          </Box>
        )}
        <Typography variant="h6" gutterBottom align="center">
          Select a speaker
        </Typography>
        <Box className="carousel-container">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {voices.map((v) => (
                <div key={v.name} className="embla__slide carousel-item">
                  <div className="carousel-box">
                    <img src={v.image} alt={v.name} className="carousel-image" />
                    <Typography variant="body2" align="center">{v.name}</Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="embla__buttons-container">
            <IconButton className="embla__button embla__button--prev" onClick={() => emblaApi && emblaApi.scrollPrev()}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton className="embla__button embla__button--next" onClick={() => emblaApi && emblaApi.scrollNext()}>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </Box>
        <div className="speech-container">
          <div className="image-container">
            <img
              src={voices.find((v) => v.name === voice).image}
              alt={`${voice}`}
              className="speaker-image"
            />
          </div>
          {isPlaying && (
            <div className="soundwave">
              <div className="boxContainer">
                <div className="box box1"></div>
                <div className="box box2"></div>
                <div className="box box3"></div>
                <div className="box box4"></div>
                <div className="box box5"></div>
              </div>
            </div>
          )}
        </div>
        <audio ref={audioRef} style={{ display: 'none' }} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
