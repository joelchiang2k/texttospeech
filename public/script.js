// script.js

function synthesizeSpeech() {
  const textToSpeak = document.getElementById('textToSpeak').value.trim();
  const selectedVoice = document.getElementById('voiceSelect').value;

  if (textToSpeak === '') {
    alert('Please enter text to synthesize.');
    return;
  }

  // Use fetch to send a request to your server or AWS Lambda
  fetch('/synthesize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: textToSpeak, voice: selectedVoice }) // Include selected voice
  })
  .then(response => response.blob())
  .then(blob => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioURL = URL.createObjectURL(blob);
    
    audioPlayer.src = audioURL;
    audioPlayer.style.display = 'block';
    audioPlayer.play();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Speech synthesis failed. Please try again.');
  });
}
