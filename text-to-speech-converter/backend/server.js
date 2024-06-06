const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

console.log('Environment PORT:', process.env.PORT);
console.log('Using PORT:', port);

// Use cors middleware to enable CORS for specific domains
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://text2speechs3bucket.s3-website-us-east-1.amazonaws.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

console.log(process.env.ACCESS_KEY_ID)
console.log(process.env.SECRET_ACCESS_KEY)
// Configure AWS credentials and Polly
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const polly = new AWS.Polly();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//post request sent from frontend
console.log(port)
app.post('/synthesize', async (req, res) => {
    const text = req.body.text;
    const selectedVoice = req.body.voice || 'Joanna'; 
    if (!text) {
      return res.status(400).json({ error: 'Text not provided' });
    }
    
    //params sent from frontend
    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: selectedVoice
    };
    
    //sends mpeg file to frontend to play
    try {
      const data = await polly.synthesizeSpeech(params).promise();
      res.set('Content-Type', 'audio/mpeg');
      res.send(data.AudioStream);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Speech synthesis failed' });
    }
  });

//running port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
