// app.js

const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // Change as needed

// Configure AWS credentials and Polly
AWS.config.update({
  accessKeyId: 'AKIA3TFGENAQRJEUBC7G',
  secretAccessKey: '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',
  region: 'us-east-2'
});

const polly = new AWS.Polly();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/synthesize', async (req, res) => {
    const text = req.body.text;
    const selectedVoice = req.body.voice || 'Joanna'; // Default to Joanna if voice not provided
  
    if (!text) {
      return res.status(400).json({ error: 'Text not provided' });
    }
  
    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: selectedVoice // Use the selected voice
    };
  
    try {
      const data = await polly.synthesizeSpeech(params).promise();
      res.set('Content-Type', 'audio/mpeg');
      res.send(data.AudioStream);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Speech synthesis failed' });
    }
  });
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
