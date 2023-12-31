const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure AWS credentials and Polly
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});

const polly = new AWS.Polly();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//post request sent from frontend
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
